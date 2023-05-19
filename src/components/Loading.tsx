import classes from '../styles/modules/Loading.module.scss'

const Loading = ({diameter = 20}) => {
    return (
        <div className='center-x center-y'>
            <div style={{width: diameter, height: diameter}} className={classes.loading}>
                <span></span>
                <span></span>
            </div>
        </div>

    );
};

export default Loading;