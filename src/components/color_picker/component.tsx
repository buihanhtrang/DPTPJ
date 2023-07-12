

import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'


// models
import { IConfiguratorOption } from '@/models/configuration'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import './component.scss'

type ColorPickerComponentProps = {
    options: IConfiguratorOption
    onSelectedColor: (arg0: string, arg1: string)=> void
}
const ColorPickerComponent = ({ options: { title, colors, selectedColor }, onSelectedColor }: ColorPickerComponentProps) => {
    return (
        <motion.div
            className='color_section'
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            <motion.h3 variants={itemVariants} className='color_section__title'>
                <strong>
                    {title}
                </strong>
            </motion.h3>

            <motion.div variants={containerVariants} className="color_section__color_container">
                {
                    colors.map((color)=> {

                        return (
                            <motion.div
                                key={color}
                                variants={itemVariants}
                                onClick={()=> onSelectedColor(title, color)}
                                className={
                                    clsx(
                                        [ 'color_section__color' ],
                                        {
                                            'color_section__color_selected': selectedColor === color,
                                        }
                                    )
                                }
                                style={{
                                    backgroundColor: color,
                                }}
                            />
                        )
                    })
                }
            </motion.div>
            
        </motion.div>
    )
}

export default ColorPickerComponent
