import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'


// styles
import { containerVariants, itemVariants, logoVariants, scaledLogoContainerVariants } from '@/styles/variants'
import styles from './component.module.css'



const LoaderProp =({ src }) => {
    return src;
}

const MoreCard = () => {
    return (
        <div className={styles.card}>

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

            {/* content */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className={styles.cardContent}
            >

                <motion.svg
                    width="40"
                    height="43"
                    viewBox="0 0 48 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={scaledLogoContainerVariants}
                    className={styles.logo}
                >
                    <motion.path
                        d="M2 20L24 3L46 20V41H2V20Z"
                        fill="transparent"
                        stroke="white"
                        strokeWidth="8"
                        pathLength={1}
                        strokeDasharray="1 1"
                        variants={logoVariants}
                        className={styles.logoPath}
                    />
                </motion.svg>


                <motion.div
                    variants={containerVariants}
                    className={styles.cardContentColumn}
                >
                    <motion.p className={styles.cardContentTitle} variants={itemVariants}>
                        More.
                    </motion.p>

                    <motion.p className={styles.cardContentSubTitle} variants={itemVariants}>
                        Cozy Coming
                    </motion.p>

                    <motion.p className={styles.cardContentDescription} variants={itemVariants}>
                        This 3D version of Ashley&apos;s Furniture is still in beta. We will be updating it gradually to reflect all products. Beta period will end in 2024.
                    </motion.p>

                    <motion.div className={styles.cardContentOff} variants={itemVariants}>
                        { moment(new Date("2024-01-01")).fromNow() }
                    </motion.div>

                    </motion.div>

                </motion.div>
            
        </div>
    )
}

export default MoreCard