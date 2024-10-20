
import dealsImg from "../../assets/deals.png"
const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealsImg} alt='' ></img>
        </div>

        <div className='deals__content'>
            <h5>Upto 20% Discount</h5>
            <h4>Deals of the month</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium aut quibusdam accusantium qui blanditiis accusamus quisquam deleniti ea magnam est!</p>
        

        <div className='deals__countdown flex-wrap'>


                
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>15</h4>
                    <p>Minutes</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>5</h4>
                    <p>Seconds</p>
                </div>

        </div>
        
        </div>
    </section>
  )
}

export default DealsSection