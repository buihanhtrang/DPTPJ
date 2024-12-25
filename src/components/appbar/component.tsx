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
                    width="80"
                    height="40"
                    viewBox="0 0 30 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={logoContainerVariants}
                    className={styles.logo}
                >
                    <motion.path
                        d="M8 12 H56 V42 H8 V12 Z"
                        fill="#000"
                        stroke="#05def2"
                        strokeWidth="3"
                        pathLength={1}
                        strokeDasharray="1 1"
                        variants={logoVariants}
                    />

                    <motion.path
                        d="M4 44 H60 V50 H4 V44 Z"
                        fill="#fff"
                        stroke="#05def2"
                        strokeWidth="3"
                        pathLength={1}
                        strokeDasharray="1 1"
                        variants={logoVariants}
                    />
                </motion.svg>

                {
                    !isMobile &&
                        <motion.p variants={itemVariants} className={styles.appName}>
                            H2TL Shop
                        </motion.p>
                }
            </motion.div>


{/*             
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
                        placeholder="Search your product..."
                        inputProps={{ 'aria-label': 'search your future product' }}
                    />
                </Paper>
            </motion.div> */}


            <motion.div variants={itemVariants}>
                <Button
                    disableElevation
                    href='/'
                    variant='contained'
                    style={{
                        textTransform: 'none',
                    }}
                >
                    {
                        isMobile ? "Home" : "HomePage"
                    }
                </Button>
            </motion.div>

        </motion.div>
    )
}

export default Appbar
