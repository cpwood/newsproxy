import sa from 'superagent';
import querystring from 'querystring';

export class NewsClient {
    agent;

    _userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36';

    constructor() {
        this.agent = sa.agent();
    }

    getUrl = async (channel) => {   
        for (let i = 0; i < 5; i++) {
            let response = await this.agent
                .get(channel.url)
                .set('User-Agent', this._userAgent);

            if (response.text.indexOf('.m3u8') >= 0) {
                return /"(https:\/\/[^"]+\.m3u8)"/gm.exec(response.text)[1];
            }

            await this.agent
                .post('https://livenewspro.com/login/')
                .set('User-Agent', this._userAgent)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(querystring.stringify({
                    'log': process.env.NEWS_USER,
                    'pwd': process.env.NEWS_PASSWORD,
                    'rememberme': 'forever',
                    'wp-submit': 'Log In',
                    'redirect_to': 'https://livenewspro.com/channel',
                    'mepr_process_login_form': 'true',
                    'mepr_is_login_page': 'true'
                }));
        }
        
        throw `Unable to load ${channel.id} stream`;
    };
}