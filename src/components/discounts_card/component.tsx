"use client"
import React from 'react'
import { Button, InputBase, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useWindowWidth } from '@react-hook/window-size'
import { MdSearch, } from 'react-icons/md'

// styles
import { containerVariants, itemVariants, } from '@/styles/variants'
import styles from './component.module.css'
import Image from 'next/image'


type DiscountCardProps = {
    scrollToShop: ()=> void
}
const DiscountCard = ({ scrollToShop }: DiscountCardProps) => {
  return (
    <motion.div
        className={styles.card}
        variants={containerVariants}
        initial="initial"
        animate="animate"
    >
        
        <motion.div className={styles.cardContent}>

            <motion.p className={styles.cardContentTitle}>
                Cozy.
            </motion.p>

            <motion.p className={styles.cardContentSubTitle}>
                Is the word
            </motion.p>

            <motion.p className={styles.cardContentDescription}>
                Start your holidays with more confort and amazing discounts.
            </motion.p>

            <motion.p className={styles.cardContentOff}>
                From 40% Off
            </motion.p>

            <motion.div variants={itemVariants}>
                <Button
                    variant='contained'
                    disableElevation
                    onClick={()=> scrollToShop()}
                    size='large'
                >
                    Start Shopping
                </Button>
            </motion.div>

        </motion.div>

        <motion.div variants={itemVariants} className={styles.imageContainer}>
            <Image
                src={'/assets/cozy-2.jpg'}
                alt='Discount Image'
                width={100}
                height={200}
                className={styles.image}
            />
        </motion.div>


    </motion.div>
  )
}

export default DiscountCard