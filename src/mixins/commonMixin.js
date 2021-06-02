// Importing Utils
const axios = require('axios').default

export default {
    data() {
        return {
            clicked: false,
            onceLoaded: false,
            iframeEl: null,
            videoInfo: null,
            fetchingInfo: true,
            isVideoFound: false
        }
    },
    methods: {
        fetchingOembed(type = 'youtube') {
            const self = this
            let url = ''

            console.log("fetchingOembed::type=" + type);

            // url = type === 'youtube' ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json` : `https://vimeo.com/api/oembed.json?url=${this.src}`
            if (type === 'youtube') {
                url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json`;

            } else if (type === 'vimeo') {
                url = `https://vimeo.com/api/oembed.json?url=${this.src}`;
            } else if (type === 'gtv') {
                url = `https://gtv.org/oembed/${this.src}`;
            }

            console.log("fetchingOembed::url=" + url);
            // <div style="width: 560px; height: 415px;"><iframe src="https://gtv.org/embed/60af4f0db7dff64ac984680a" width="100%" height="100%" frameborder="0" scrolling="no" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>


            axios.get(url)
                .then(function(response) {
                    // handle success
                    self.videoInfo = response.data
                    if (type === 'vimeo') {
                        self.videoID = response.data.video_id
                    }
                    self.isVideoFound = true
                    console.log("fetchingOembed::videoInfo=" + self.videoInfo);

                })
                .catch(function() {
                    // handle error
                    self.videoInfo = null
                    self.isVideoFound = false
                })
                .then(function() {
                    // always executed
                    self.fetchingInfo = false

                    if (self.autoplay) {
                        self.playVideo()
                    }
                })
        },
        isPostMessageSupported() {
            if (!window.postMessage) {
                return false
            }
            return true
        },

        createIframe(flag = true, type = 'youtube') {
            if (this.iframeEl === null && flag) {
                this.clicked = true
                this.iframeEl = document.createElement('iframe')
                if (type === 'youtube') {
                    this.iframeEl.setAttribute('src', `https://www.youtube.com/embed/${this.videoID}?enablejsapi=1&autoplay=1`)
                } else if (type === 'vimeo') {
                    this.iframeEl.setAttribute('src', `https://player.vimeo.com/video/${this.videoID}?autoplay=1`)
                } else if (type === 'gtv') {
                    this.iframeEl.setAttribute('src', `https://gtv.org/embed/${this.videoID}`)
                    this.iframeEl.setAttribute('scrolling', 'no');
                    this.iframeEl.setAttribute('width', '100%');
                    this.iframeEl.setAttribute('height', '100%');
                }
                this.iframeEl.setAttribute('frameborder', '0')
                this.iframeEl.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
                this.iframeEl.setAttribute('allowfullscreen', '1')
                this.iframeEl.setAttribute('title', `${this.getTitle}`)
                this.iframeEl.setAttribute('class', `${this.iframeClass}`)

                this.iframeEl.addEventListener('load', this.handleLoad)

                this.$el.lastChild.appendChild(this.iframeEl)

                this.iframeEl.focus()
            }
        },
        resetView() {
            if (this.iframeEl !== null) {
                // Removing form dom
                this.iframeEl.remove()

                // Resetting the states
                this.iframeEl = null
                this.clicked = false
                this.onceLoaded = false
            }
        },
        resetState() {
            this.resetView()
            this.clicked = false,
                this.onceLoaded = false,
                this.iframeEl = null,
                this.videoInfo = null,
                this.fetchingInfo = true,
                this.isVideoFound = false
        },
        calcAspect(aspect) {
            const aspects = aspect.split(':')

            return typeof aspects[1] === 'undefined' ? 56.25 : aspects[1] / aspects[0] * 100
        },
        handleLoad() {
            if (this.fetchingInfo === false) {
                if (!this.onceLoaded) {
                    this.onceLoaded = true
                }
            }
        }
    }
}