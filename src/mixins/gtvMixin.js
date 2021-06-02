export default {
    methods: {
        getGtvID(url) {
            // url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/u)
            // url = "https://gtv.org/video/id=60af4f0db7dff64ac984680a";
            url = url.split(/(id=|\/v\/|youtu\.be\/|\/embed\/)/u)
                /* eslint-disable no-useless-escape */
            return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/iu)[0] : url[0]
        },
        pauseVideo() {
            if (!this.isPostMessageSupported) {
                return
            }

            if (this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            }
        },
        playVideo() {
            console.log("playVideo::isPostMessageSupported=" + this.isPostMessageSupported());
            if (!this.isPostMessageSupported) {
                return
            }

            if (this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
            } else {
                this.createIframe(this.isVideoFound, 'gtv')
            }
        },

        stopVideo() {
            if (!this.isPostMessageSupported) {
                return
            }

            if (this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
            }
        },
        getGtvThumbnail() {
            let thumbnail = false;

            // if (video_id) {
            //     if (typeof quality === 'undefined') {
            //         quality = 'high'
            //     }

            //     let quality_key = 'maxresdefault' // Max quality
            //     if (quality === 'default') {
            //         quality_key = 'default'
            //     } else if (quality === 'medium') {
            //         quality_key = 'mqdefault'
            //     } else if (quality === 'high') {
            //         quality_key = 'hqdefault'
            //     } else if (quality === 'standard') {
            //         quality_key = 'sddefault'
            //     } else if (quality === 'maxres') {
            //         quality_key = 'maxresdefault'
            //     }

            //     thumbnail = 'http://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg'
            //     return thumbnail
            // }

            return thumbnail;
        }
    }
}