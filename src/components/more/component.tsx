import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'


// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import styles from './component.module.css'



const LoaderProp =({ src }) => {
    return src;
}

const MoreCard = () => {
    return (
        <div className={styles.card}>

            {/* content */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className={styles.cardContent}
            >

                <motion.p className={styles.cardContentTitle} variants={itemVariants}>
                    More Cozy.
                </motion.p>

                <motion.p className={styles.cardContentSubTitle} variants={itemVariants}>
                    Coming
                </motion.p>

                <motion.p className={styles.cardContentDescription} variants={itemVariants}>
                    This 3D version of Ashley&apos;s Furniture is still in beta. We will be updating it gradually to reflect all products. Beta period will end in 2024.
                </motion.p>

                <motion.div className={styles.cardContentOff} variants={itemVariants}>
                    { moment(new Date("2024-01-01")).fromNow() }
                </motion.div>

                </motion.div>

                {/* image */}
                <motion.div variants={itemVariants} className={styles.imageContainer}>
                    <Image
                        src={'/assets/cozy-1.jpg'}
                        alt='Discount Image'
                        fill
                        className={styles.image}
                        loader={LoaderProp}
                    />
                </motion.div>

            
        </div>
    )
}

export default MoreCard