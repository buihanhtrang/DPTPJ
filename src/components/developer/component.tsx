"use client"
import React from 'react'
import { Button, InputBase, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { MdSearch, } from 'react-icons/md'
import { BiLogoLinkedin } from 'react-icons/bi'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

// styles
import { containerVariants, itemVariants, logoContainerVariants, logoVariants } from '@/styles/variants'
import styles from './component.module.css'


const DeveloperInfo = () => {
    return (
        <motion.div
            className={styles.section}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <Link href='https://www.linkedin.com/in/felix-ndunda-0ba841108/' target='_blank'>
                <motion.div variants={itemVariants} className={styles.sectionCard}>
                    <BiLogoLinkedin />
                </motion.div>
            </Link>

            <Link href='https://github.com/efenstakes/ashleys/' target='_blank'>
                <motion.div variants={itemVariants} className={styles.sectionCard}>
                    <FaGithub />
                </motion.div>
            </Link>
            
        </motion.div>
    )
}

export default DeveloperInfo