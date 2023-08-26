# NewsProxy

NewsProxy is a Docker-based M3U8 playlist generator and stream grabber for the [Live News Pro](https://livenewspro.com/) streaming services. It allows you to watch their channels in the IPTV or PVR client of your choice.

> A paid subscription to the services is required.

## Running the container

The following example Docker Compose file will allow you to run the container:

```yaml
version: '3.3'
services:
  newsproxy:
    image: cpwood/newsproxy:latest
    container_name: newsproxy
    network_mode: bridge
    ports:
      - '8080:8080'
    restart: unless-stopped
    environment:
      - NEWS_USER: foo@bar.com
      - NEWS_PASSWORD: ffhsfhsh
      - NEWS_HOST: http://192.168.1.2:8080
```

The `NEWS_HOST` environment variable is optional. If specified, the contents of `index.m3u8` will use absolute URLs, starting with this host. This is handy if you have port-mapped the image to a different port number on your Docker host machine. If the environment variable _isn't_ specified, a relative URL will be used in the `index.m3u8` file.

Alternatively, use the following example `docker` command:

```
docker run -p 8080:8080 -e NEWS_USER=foo@bar.com -e NEWS_PASSWORD=ffhsfhsh -e NEWS_HOST=http://192.168.1.2:8080 cpwood/newsproxy:latest
```

## Using the running container

You can use the following URLs in your preferred IPTV or PVR client:

* **Playlist**: `http://<ip>:8080/index.m3u8`
* **CNBC**: `http://<ip>:8080/cnbc/master.m3u8`
* **CNN**: `http://<ip>:8080/cnn/master.m3u8`
* **Fox News**: `http://<ip>:8080/fox-news/master.m3u8`
* **ABC News (Australia)**: `http://<ip>:8080/abc-news-australia/master.m3u8`
* **One America News**: `http://<ip>:8080/oan/master.m3u8`
* **CBS**: `http://<ip>:8080/cbs/master.m3u8`
* **Aljazeera**: `http://<ip>:8080/aljazeera/master.m3u8`
* **Fox Business**: `http://<ip>:8080/fox-business/master.m3u8`
* **Weather Channel**: `http://<ip>:8080/weather-channel/master.m3u8`
* **BBC News**: `http://<ip>:8080/bbc-news/master.m3u8`
* **CBC**: `http://<ip>:8080/cbc/master.m3u8`
* **ABC News (US)**: `http://<ip>:8080/abc-news/master.m3u8`
* **WeatherNation**: `http://<ip>:8080/weathernation/master.m3u8`
* **NewsMax TV**: `http://<ip>:8080/newsmaxtv/master.m3u8`
* **C-SPAN**: `http://<ip>:8080/cspan/master.m3u8`
* **Bloomberg**: `http://<ip>:8080/bloomberg/master.m3u8`
* **HLN**: `http://<ip>:8080/hln/master.m3u8`
* **CNN (Alternative)**: `http://<ip>:8080/cnn-alt/master.m3u8`
* **Fox News (Alternative)**: `http://<ip>:8080/fox-news-alt/master.m3u8`
* **MSNBC (Alternative)**: `http://<ip>:8080/msnbc-alt/master.m3u8`
