import React, { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'


// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import styles from './component.module.css'



const ConfiguratorComponent = ({ title, subTitle, isConfiguratorOpen, children }: { title: string, subTitle: string, isConfiguratorOpen: (boolean)=> void, children: ReactNode }) => {
    const [shown, setShown] = useState(true)

    return (
        <motion.div
            className={styles.configurator}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <motion.div className={styles.configuratorContent} variants={containerVariants}>
                

                {
                    shown &&
                        <>
                            <motion.h4 variants={itemVariants} className={styles.configuratorContentTitle}>
                                { title }
                            </motion.h4>
            
                            <motion.h1 variants={itemVariants} className={styles.configuratorContentSubTitle}>
                                { subTitle }
                            </motion.h1>

                            { children }
                        </>
                }


                <motion.div variants={itemVariants} className={styles.configuratorContentCtas}>
                    <Button
                        onClick={
                            ()=> {
                                setShown(!shown)
                                isConfiguratorOpen(!shown)
                            }
                        }
                        color='inherit'
                        size='large'
                        style={{
                            textTransform: 'none',
                        }}
                        fullWidth
                    >
                        { shown ? "Hide" : "Show Configurator" }
                    </Button>
                </motion.div>

            </motion.div>

        </motion.div>
    )
}

export default ConfiguratorComponent
