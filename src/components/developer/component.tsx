"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { BiLogoLinkedin } from 'react-icons/bi'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

// styles
import { containerVariants, itemVariants} from '@/styles/variants'
import styles from './component.module.css'


const DeveloperInfo = () => {
    return (
        <motion.div
            className={styles.section}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <Link href='https://www.github.com/buihanhtrang/' target='_blank'>
                <motion.div variants={itemVariants} className={styles.sectionCard}>
                    <BiLogoLinkedin />
                </motion.div>
            </Link>

            <Link href='https://www.github.com/buihanhtrang/' target='_blank'>
                <motion.div variants={itemVariants} className={styles.sectionCard}>
                    <FaGithub />
                </motion.div>
            </Link>
            
        </motion.div>
    )
}

export default DeveloperInfo