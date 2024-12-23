import styles from './component.module.css'

const CompareBar = ({ compareList, openModal, removeFromCompare }) => {
    return (
        <div className={styles.compareBar}>
            {compareList.map((product, i) => (
                <div className={styles.productItem} key={i}>
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                    <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCompare(product)}
                    >
                        ×
                    </button>
                </div>
            ))}
            <button onClick={() => {
                if (!compareList || compareList.length < 2) {
                    alert("You need at least 2 products to compare!");
                }
                else openModal()
            }}>Compare</button>
        </div>
    );
};

export default CompareBar;