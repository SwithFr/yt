let btn = document.querySelector( '#disable-btn' )
let active = !!localStorage.getItem( 'yt-cleaner-active' )

if ( active ) {
	btn.innerHTML = 'Activer'
} else {
	btn.innerHTML = 'Désactiver'
}

btn.addEventListener( 'click', ( event ) => {

	chrome.storage.sync.get( 'extensionIsActive', ( options ) => {

		let active = options.extensionIsActive
		event.target.innerHTML = active ? 'Désactiver' : 'Activer'

		chrome.storage.sync.set( {
			extensionIsActive: !active
		} )

	} )

}, false )
