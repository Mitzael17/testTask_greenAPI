import rectangleBackground from "../assets/HomeBackground.svg";

const HomePage = () => {

    return (
        <div className='homePage'>
            <div className='homePage__rectangle'>
                <img src={rectangleBackground} alt="background"/>
                <img src={rectangleBackground} alt="background"/>
            </div>
            <div className='homePage__content'>
                <h2>Messenger Web</h2>
                <p>Отправляйте и получайте сообщения с помощью GREEN API</p>
            </div>
        </div>
    );
};

export default HomePage;