let songs = [
    {
        name: 'insaan',
        path: 'singles/insaan.mp3',
        album: 'single',
        cover: 'imagenes/cover/cover-insaan.png',
        feat: ''
    },
    {
        name: 'pretty woman',
        path: 'singles/pretty.mp3',
        album: 'single',
        cover: 'imagenes/cover/cover-pretty.png',
        feat: ''
    },
    {
        name: 'boig per tu',
        path: 'singles/boigpertu.mp3',
        album: 'single',
        cover: 'imagenes/cover/cover-boigpertu.png',
        feat: 'SAU (remix)'
    },
    {
        name: 'mediterraneo',
        path: 'singles/mediterraneo.mp3',
        album: 'single',
        cover: 'imagenes/cover/cover-mediterraneo.png',
        feat: 'Joan Manuel Serrat (remix)'
    },
    {
        name: 'africains',
        path: 'singles/africains.mp3',
        album: 'réveillez-vous',
        cover: 'imagenes/cover/cover-africains.png',
        feat: 'feat MamJ Ras Soul'
    },
    {
        name: 'hanii ann lii',
        path: 'singles/haniiannlii.mp3',
        album: 'ibrahima',
        cover: 'imagenes/cover/cover-hanii.png',
        feat: 'feat Koula'
    },
    {
        name: 'and xeex',
        path: 'singles/andxeexcovid19.mp3',
        album: 'covid19',
        cover: 'imagenes/cover/cover-covid.png',
        feat: 'feat MamJ Ras Soul'
    },
    {
        name: 'dance with me',
        path: 'smile-again/dancewithme.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'dawise',
        path: 'smile-again/dawise.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'is this love',
        path: 'smile-again/isthislove.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'Bob Marley (remix)'
    },
    {
        name: 'all of us',
        path: 'smile-again/allofus.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat Koula'
    },
    {
        name: 'sbn',
        path: 'smile-again/bayesanguendiaye.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat Prof & Koula'
    },
    {
        name: 'lets make it',
        path: 'smile-again/letsmakeit.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat Ndongo D'
    },
    {
        name: 'mam afrika',
        path: 'smile-again/mamafrika.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'mame baye',
        path: 'smile-again/mamebaye.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat Koula'
    },
    {
        name: 'move it',
        path: 'smile-again/moveit.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'my lord',
        path: 'smile-again/mylord.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'ndakaaru',
        path: 'smile-again/ndakaaru.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'no matter',
        path: 'smile-again/nomatter.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'not like me',
        path: 'smile-again/notlikeme.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat Poppin'
    },
    {
        name: 'rise up',
        path: 'smile-again/riseup.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: 'feat sammy'
    },
    {
        name: 'show me',
        path: 'smile-again/showme.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'my fight',
        path: 'smile-again/youmyfight.mp3',
        album: 'smile again',
        cover: 'imagenes/cover/cover-smileagain.png',
        feat: ''
    },
    {
        name: 'leniol',
        path: 'jay-soul/leniol.mp3',
        album: 'jay soul',
        cover: 'imagenes/cover/cover-jaysoul.png',
        feat: ''
    },
    {
        name: 'sa dom',
        path: 'jay-soul/sadom.mp3',
        album: 'jay soul',
        cover: 'imagenes/cover/cover-jaysoul.png',
        feat: ''
    },
    {
        name: 'sama yaay',
        path: 'jay-soul/samayaay.mp3',
        album: 'jay soul',
        cover: 'imagenes/cover/cover-jaysoul.png',
        feat: 'feat Birahim'
    },
    {
        name: 'you can',
        path: 'jay-soul/youcan.mp3',
        album: 'jay soul',
        cover: 'imagenes/cover/cover-jaysoul.png',
        feat: ''
    },
    {
        name: 'baye niasse',
        path: 'sn-wake-up/bayeniass.mp3',
        album: 'senegal wake up',
        cover: 'imagenes/cover/cover-snwake.png',
        feat: 'feat Koula'
    },
    {
        name: 'never daw',
        path: 'sn-wake-up/neverdaw.mp3',
        album: 'senegal wake up',
        cover: 'imagenes/cover/cover-snwake.png',
        feat: ''
    },
    {
        name: 'smile again',
        path: 'sn-wake-up/smile.mp3',
        album: 'senegal wake up',
        cover: 'imagenes/cover/cover-snwake.png',
        feat: ''
    },
    {
        name: 'sn wake up',
        path: 'sn-wake-up/snwakeup.mp3',
        album: 'senegal wake up',
        cover: 'imagenes/cover/cover-snwake.png',
        feat: 'feat Bilal'
    },
]