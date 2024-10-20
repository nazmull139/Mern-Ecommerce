
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>

      <div className='header__content z-30'>

       <h4 className='uppercase'>
            Up To 20% Discount
        </h4>
        <h1>
            Girl's Fashion
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam autem quibusdam harum veritatis dicta quis!</p>

        <button className='btn'><Link to="/shop">Explore Now</Link></button>

      </div>
      <div className='header__image'>
        <img src={bannerImg} alt='banner image'></img>
      </div>
    </div>
  )
}

export default Banner