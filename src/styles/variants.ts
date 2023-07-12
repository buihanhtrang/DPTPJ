



export const containerVariants = {
    initial: {
        scale: .8,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delay: .1,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        scale: .8,
    }
}

export const itemVariants = {
    initial: {
        y: 120,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delay: .1,
            staggerChildren: 0.1,
        },
    },
}

export const slideUpVariants = {
    initial: {
        y: 120,
    },
    animate: {
        y: 0,
    },
}

export const bouncingItemVariants = {
    initial: {
        y: 60,
    },
    animate: {
        y: 0,
        transition: {
            repeat: Infinity,
            delay: .2
        },
    },
}


export const logoContainerVariants = {
    initial: {
        opacity: 0,
        scale: .6,
    },
    animate: {
        opacity: 1,
        scale: .8,
        transition: {
            when: "beforeChildren",
            delay: 1,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
    }
}


export const logoVariants = {
    initial: {
        strokeDashoffset: 1,
        fill: 'none',
    },
    animate: {
        strokeDashoffset: 0,
        transition: {
            delay: .2,
            duration: 1,
        }
    },
}