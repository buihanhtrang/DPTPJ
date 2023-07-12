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

const DiscountCard = () => {
  return (
    <div className={styles.card}>
        
        <div className={styles.cardContentContainer}>
        <motion.div
            className={styles.cardContent}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <motion.p className={styles.cardContentTitle}>
                Cozy
            </motion.p>

            <motion.p>
                Is the word
            </motion.p>

            <motion.p className={styles.cardContentDescription}>
                Start your holidays with more confort and amazing discounts.
            </motion.p>

        </motion.div>
        </div>
        
        <Image
            src={'/assets/cozy-2.jpg'}
            alt='Discount Image'
            width={100}
            height={200}
            className={styles.image}
        />
{/* 
        <div className={styles.cardOverlay} /> */}


    </div>
  )
}

export default DiscountCard