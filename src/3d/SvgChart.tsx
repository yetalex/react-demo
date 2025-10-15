const SvgChart: React.FC = () => {
  return (
    <>
      <svg 
        width="400" 
        height="300" 
        viewBox="0 0 200 250"
        style={{ border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
      >
        {/* <circle cx="50" cy="50" r="40" fill="red" /> */}
        <polyline 
          points="60,110 65,120 70,115 75,130 80,125 85,140 90,135 95,150 100,145"
          stroke="blue" 
          strokeWidth="2" 
          fill="none"
        />
        <polygon 
          points="50,160 55,180 70,180 60,190 65,205 50,195 35,205 40,190 30,180 45,180"
          stroke="green" 
          strokeWidth="2" 
          fill="transparent"
        />
        <path 
          d="M20,230 Q40,205 50,230 T90,230" 
          fill="none" 
          stroke="blue" 
          strokeWidth="5"
        />
        {/* <path d="M 10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/> */}
        <path d="M 0 0 H 190 V 190 H 20 Z" fill="transparent" stroke="red"/>
        <path d="M 10 10 C 80 80, 140 120, 250 100" stroke="black" fill="transparent"/>

        <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>

        <path d="M 10 315
        L 110 215
        A 30 50 0 0 1 162.55 162.45
        L 172.55 152.45
        A 30 50 -45 0 1 215.1 109.9
        L 315 10" stroke="black" fill="green" strokeWidth="2" fillOpacity="0.5"/>
      </svg>
      <svg
        width="188.34944mm"
        height="153.10039mm"
        viewBox="0 0 188.34944 153.10039"
        version="1.1"
        id="svg1">
        <defs
          id="defs1" />
        <g
          id="layer1"
          transform="translate(-7.9999999,-19.873606)">
          <rect
            style={{fill: '#ff9bff', fillOpacity: 1, strokeWidth: 0.263619, strokeDasharray: 'none'}}
            id="rect1"
            width="35"
            height="100"
            x="8"
            y="20" />
          <rect
            style={{fill: '#800080', fillOpacity: 1, strokeWidth: 0.259164, strokeDasharray: 'none'}}
            id="rect2"
            width="30"
            height="20"
            x="166.34943"
            y="75.803253" />
          <rect
            style={{fill: '#800080', strokeWidth: 0.340698, strokeDasharray: 'none'}}
            id="rect3"
            width="30"
            height="76"
            x="166.34944"
            y="96.767944" />
          <path
            style={{fill: '#008009', fillOpacity: 0.316872, strokeWidth: 0.264999, strokeDasharray: 'none'}}    
            d="m 42.323419,19.873606 c 66.245351,57.04461 124.026021,56.30855 124.026021,56.30855 v 19.137545 c 0,0 25.76208,-4.048326 -14.72119,3.680298 C 111.14498,106.72862 43.427509,52.996282 43.427509,52.996282 Z"
            id="path5" />
          <path
            style={{fill: '#008009', fillOpacity: 0.316872, strokeWidth: 0.264999, strokeDasharray: 'none'}}    
            d="M 42.323419,52.996282 C 102.31227,129.54647 165.24535,98.263939 165.24535,98.263939 l 1.10409,74.710041 c 0,0 -75.446096,-9.56878 -100.104087,-30.54647 -24.657992,-20.9777 -23.185874,-23.18588 -23.185874,-23.18588 z"
            id="path6" />
        </g>
      </svg>
    </>
  )
}

export default SvgChart