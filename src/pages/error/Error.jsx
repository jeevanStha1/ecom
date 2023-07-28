import React from 'react'

function Error() {
  return (
    <div className='error' style={{height:'100vh', width: '100vw', display : 'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1>404</h1>
        <p>Page Not found</p>
    </div>
  )
}

export default Error;