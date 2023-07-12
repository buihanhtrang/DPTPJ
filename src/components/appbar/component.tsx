"use client"
import React from 'react'
import { Button, InputBase, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useWindowWidth } from '@react-hook/window-size'
import { MdSearch, } from 'react-icons/md'

// styles
import { containerVariants, itemVariants, logoContainerVariants, logoVariants } from '@/styles/variants'
import styles from './component.module.css'


const Appbar = () => {
    const width = useWindowWidth()
    const isMobile = width < 1000

    return (
        <motion.div
            className={styles.appbar}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            
            <motion.div variants={containerVariants} className={styles.appbarLogoSection}>
                <motion.svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={logoContainerVariants}
                    className={styles.logo}
                >
                    <motion.path
                        d="M2 20L24 3L46 20V41H2V20Z"
                        fill="white"
                        stroke="#F1A614"
                        strokeWidth="6"
                        pathLength={1}
                        strokeDasharray="1 1"
                        variants={logoVariants}
                    />
                </motion.svg>

                {
                    !isMobile &&
                        <motion.p variants={itemVariants} className={styles.appName}>
                            Ashleys Furniture
                        </motion.p>
                }
            </motion.div>


            
            <motion.div variants={itemVariants} className={styles.search}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                >
                    <InputBase
                        startAdornment={
                            <MdSearch fontSize="24" color='gray' style={{ marginRight: '.5rem' }} />
                        }
                        sx={{ ml: 1, flex: 1, p: '.2rem' }}
                        placeholder="Search round chair..."
                        inputProps={{ 'aria-label': 'search ashleys furniture' }}
                    />
                </Paper>
            </motion.div>


            <motion.div variants={itemVariants}>
                <Button
                    disableElevation
                    href='/'
                    variant='contained'
                >
                    {
                        isMobile ? "More" : "Shop More"
                    }
                </Button>
            </motion.div>

        </motion.div>
    )
}

export default Appbar
