let alreadyHidden = JSON.parse( localStorage.getItem( 'yt-videos-ids-hidden' ) )
let videos = document.querySelectorAll( '.yt-shelf-grid-item' )

chrome.storage.sync.get( 'extensionIsActive', ( options ) => {

	if ( options.extensionIsActive || options.extensionIsActive == {} ) {
		videos.forEach( (video) => {

			let videoLi = video.querySelector('div');
			let videoID = videoLi.dataset.contextItemId;

			if ( alreadyHidden && alreadyHidden.indexOf( videoID ) > 0 ) {
				video.style.display = "none"
			}

			videoLi.innerHTML += "<a class='hide-btn' title='Ne plus voir cette video' data-video-id='" + videoID + "' href='#'>X</a>"

		} )

		let hideButtons = document.querySelectorAll( '.hide-btn' )

		hideButtons.forEach( ( btn ) => {

			btn.addEventListener( 'click', ( event ) => {
				event.preventDefault()

				let button = event.target
				let videoID = button.dataset.videoId
				let video = document.querySelector( '[data-context-item-id="' + videoID + '"]' )

				if ( alreadyHidden ) {
					alreadyHidden.push( videoID )
				} else {
					alreadyHidden = [ videoID ]
				}

				localStorage.setItem( 'yt-videos-ids-hidden', JSON.stringify( alreadyHidden ) )

				video.parentNode.style.display = 'none'

			}, false )
			
		} )

		let annotationsBtn = document.querySelector( '.ytp-menuitem:nth-child(2)' )

		if ( annotationsBtn ) {
			annotationsBtn.setAttribute( 'aria-checked', true )
		}
	}

} )
