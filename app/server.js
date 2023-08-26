'use strict';

import express from 'express';
import StringBuilder from 'node-stringbuilder';
import { NewsClient } from './news-client.js';

const newsClient = new NewsClient();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const CHANNELS = [
    {
        id: 'msnbc',
        logo: 'msnbc-us.png',
        name: 'MSNBC',
        url: 'https://livenewspro.com/msnbc-news/'
    },
    {
        id: 'cnbc',
        logo: 'cnbc-us.png',
        name: 'CNBC',
        url: 'https://livenewspro.com/cnbc/'
    },
    {
        id: 'cnn',
        logo: 'cnn-us.png',
        name: 'CNN',
        url: 'https://livenewspro.com/cnn-news/'
    },
    {
        id: 'fox-news',
        logo: 'fox-news-us.png',
        name: 'Fox News',
        url: 'https://livenewspro.com/fox-news/'
    },
    {
        id: 'abc-news-australia',
        logo: 'abc-news-au.png',
        name: 'ABC News (Australia)',
        url: 'https://livenewspro.com/abc-australia/'
    },
    {
        id: 'oan',
        logo: 'one-america-news-network-us.png',
        name: 'One America News',
        url: 'https://livenewspro.com/one-america-news/'
    },
    {
        id: 'cbs',
        logo: 'cbs-news-us.png',
        name: 'CBS',
        url: 'https://livenewspro.com/cbs-news/'
    },
    {
        id: 'aljazeera',
        logo: 'aljazeera-uk.png',
        name: 'Aljazeera',
        url: 'https://livenewspro.com/aljazeera-news/'
    },
    {
        id: 'fox-business',
        logo: 'fox-business-us.png',
        name: 'Fox Business',
        url: 'https://livenewspro.com/fox-business/'
    },
    {
        id: 'weather-channel',
        logo: 'weather-channel-us.png',
        name: 'The Weather Channel',
        url: 'https://livenewspro.com/the-weather-channel/'
    },
    {
        id: 'bbc-news',
        logo: 'bbc-news-uk.png',
        name: 'BBC News',
        url: 'https://livenewspro.com/bbc-news/'
    },
    {
        id: 'cbc',
        logo: 'cbc-ca.png',
        name: 'CBC News',
        url: 'https://livenewspro.com/cbc-news/'
    },
    {
        id: 'abc-news',
        logo: 'abc-news-us.png',
        name: 'ABC News (US)',
        url: 'https://livenewspro.com/abc-news/'
    },
    {
        id: 'weathernation',
        logo: 'weathernation-us.png',
        name: 'WeatherNation',
        url: 'https://livenewspro.com/weather-nation/'
    },
    {
        id: 'newsmaxtv',
        logo: 'newsmax-tv-us.png',
        name: 'NewsMax TV',
        url: 'https://livenewspro.com/newsmax-tv/'
    },
    {
        id: 'cspan',
        logo: 'c-span-1-us.png',
        name: 'C-SPAN',
        url: 'https://livenewspro.com/c-span/'
    },
    {
        id: 'bloomberg',
        logo: 'bloomberg-television-us.png',
        name: 'Bloomberg',
        url: 'https://livenewspro.com/bloomberg/'
    },
    {
        id: 'hln',
        logo: 'hln-us.png',
        name: 'HLN',
        url: 'https://livenewspro.com/hln-tv/'
    },
    {
        id: 'cnn-alt',
        logo: 'cnn-us.png',
        name: 'CNN (Alternative)',
        url: 'https://livenewspro.com/cnnalt/'
    },
    {
        id: 'fox-news-alt',
        logo: 'fox-news-us.png',
        name: 'Fox News (Alternative)',
        url: 'https://livenewspro.com/fox-news-alternate/'
    },
    {
        id: 'msnbc-alt',
        logo: 'msnbc-us.png',
        name: 'MSNBC (Alternative)',
        url: 'https://livenewspro.com/msnbc-alternate/'
    }
];

// App
const app = express();

const loadStream = async(channel) => {
    const start = performance.now();
    const result = await newsClient.getUrl(channel);
    const end = performance.now();

    console.log(`Stream loading for ${channel.id} took ${end - start} milliseconds`);
    console.log();

    return result;
};

app.get('/index.m3u8', async (req, res) => {
    const output = new StringBuilder();
    let index = 0;

    output.appendLine('#EXTM3U');
    output.appendLine();

    for (const c of CHANNELS) {
        output.appendLine(`#EXTINF:-1 tvg-id="${index}" tvg-logo="https://raw.githubusercontent.com/cpwood/newsproxy/main/logos/${c.logo}",${c.name}`);
        output.appendLine(`${process.env.NEWS_HOST ?? ''}/${c.id}/master.m3u8`);
        output.appendLine('');

        index++;
    }

    res.setHeader('Content-Type', 'application/x-mpegURL');
    res.setHeader('Content-Disposition', 'attachment; filename="index.m3u8"');
    res.send(output.toString());
});

app.get('/:id/master.m3u8', async (req, res) => {
    res.redirect(await loadStream(CHANNELS.find(x => x.id == req.params.id)));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
