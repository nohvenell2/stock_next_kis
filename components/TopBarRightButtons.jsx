import MockInvestment from './MockInvestment';
import FavoriteList from './FavoriteList';
import styles from './TopBarRightButtons.module.scss';  
export default function TopBarRightButtons(){
    return (
        <div className={styles.container}>
            <FavoriteList/>
            <MockInvestment/>
        </div>
    )
}

