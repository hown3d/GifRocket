const config = {
    color: '#225159'
};

class Script {
    /**
     * @params {object} request
     */
    prepare_outgoing_request({ request }) {
        const trigger = request.data.trigger_word.toLowerCase();
        const phrase = request.data.text.toLowerCase().replace(trigger, '').replace(/ /g, '+');
        let u = '';
        if(trigger.indexOf('gif') !== -1) {
            if (phrase.indexOf('random') !== -1) {
                u = request.url + 'gifs/random?api_key=dc6zaTOxFJmzC&limit=1';
            } else {
                u = request.url + 'gifs/search?api_key=dc6zaTOxFJmzC&q=' + phrase;
            }
        } else {
            if (phrase.indexOf('random') !== -1) {
                u = request.url + 'stickers/random?api_key=dc6zaTOxFJmzC&limit=1';
            } else {
                u = request.url + 'stickers/search?api_key=dc6zaTOxFJmzC&q=' + phrase;
            }
       }
        return {
            url: u,
            headers: request.headers,
            method: 'GET'
        };
    }

    process_outgoing_response({ request, response }) {
        let gif = '';
        content = JSON.parse(response.content)
        if(content.data.length !== 0) {
            if(Array.isArray(content.data)) {
                const count = content.data.length - 1;
                const i = Math.floor((Math.random() * count));
                gif = content.data[i].images.original.url;
            } else {
                gif = content.data.image_original_url;
            }
            return {
                content: {
                    attachments: [
                        {
                            title: "Gify",
                            image_url: gif,
                            color: ((config['color'] != '') ? '#' + config['color'].replace('#', '') : '#225159')
                        }
                    ]
                }
            };
        } else {
            return {
                content: {
                    text: 'nice try, but I haven\'t found anything :cold_sweat:'
                }
            };
        }
    }
}
