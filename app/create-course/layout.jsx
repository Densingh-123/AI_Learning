import React from 'react'
import Header from '../dashboard/_components/Header'
import SideBar from '../dashboard/_components/SideBar'

const CreateCourseLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Full-width header with inline styles */}
      <div style={{ width: '100%', position: 'relative', left: 0 }}>
        <SideBar/>
        <Header />
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '16px', paddingLeft:230,paddingTop:90}}>
        {children}
      </div>
    </div>
  )
}

export default CreateCourseLayout
