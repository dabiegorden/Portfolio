import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import AppWrap from '../../wrapper/AppWrap';
import { client, urlFor } from '../../client';

import './Header.scss';

const scaleVariants = {
  whileInView: {
     scale: [0, 1],
     opacity: [0 , 1],
     transition: {
      duration: 1,
      ease: 'easeInOut',
     }
  }
}

const Header = () => {
const [banners, setBanners] = useState([]);

useEffect(() => {
  // fetching data from the sanity CMS
  const bannerQuery = '*[_type == "banner"]';
    client.fetch(bannerQuery).then((data) => {
       setBanners(data);
    })
  
}, []);


  return (
    <div className='app__header app__flex'>
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5  }}
          className="app__header-info"
        >
          <div className="app__header-badge">
              <div className="badge-cmp app__flex">
                  <span>👋</span>
                   <div style={{ marginLeft: 20 }}>
                       <p className="p-text">Hello, I am</p>
                        <h1 className="head-text">Gordon</h1>
                   </div>
              </div>
              
              <div className="tag-cmp app__flex">
              <p className="p-text">Web Developer</p>
              <p className="p-text">Freelancer</p>
              </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delayChildren: 0.5  }}
          className="app__header-img"
        >
            {banners.map((banner) => (
              <>
                <img src={urlFor(banner.imgUrl)} alt="profile_bg" />
                <motion.img
                whileInView={{ scale: [0, 1] }}
                transition={{ duration: 1, ease: 'easeInOut'  }}
                src={images.circle}
                alt="profile_circle"
                className="overlay_circle"
             />
              </>
            ))}
        </motion.div>

        <motion.div
          variants={scaleVariants}
          whileInView={scaleVariants.whileInView}
          className="app__header-circles"
        >
            {[images.flutter, images.redux, images.sass].map((circle, index) => (
              <div className="circle-cmp app__flex" key={`circle-${index}`}>
                  <img src={circle} alt="circle" />
              </div>
            ))}
        </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home'); 