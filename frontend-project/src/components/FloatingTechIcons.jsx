import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws, 
  FaDocker, 
  FaGitAlt,
} from 'react-icons/fa'
import { 
  SiTypescript, 
  SiKubernetes, 
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiNextdotjs
} from 'react-icons/si'

const MotionBox = motion.create(Box)

const FloatingTechIcons = () => {
  const icons = [
    { Icon: FaReact, color: '#61DAFB', delay: 0 },
    { Icon: SiTypescript, color: '#3178C6', delay: 0.5 },
    { Icon: FaNodeJs, color: '#339933', delay: 1 },
    { Icon: FaPython, color: '#3776AB', delay: 1.5 },
    { Icon: FaAws, color: '#FF9900', delay: 2 },
    { Icon: FaDocker, color: '#2496ED', delay: 2.5 },
    { Icon: SiKubernetes, color: '#326CE5', delay: 3 },
    { Icon: SiMongodb, color: '#47A248', delay: 3.5 },
    { Icon: SiRedis, color: '#DC382D', delay: 4 },
    { Icon: SiGraphql, color: '#E10098', delay: 4.5 },
    { Icon: FaGitAlt, color: '#F05032', delay: 5 },
    { Icon: SiNextdotjs, color: '#000000', delay: 5.5 }
  ]

  const positions = [
    { top: '15%', left: '10%' },
    { top: '25%', right: '15%' },
    { top: '35%', left: '8%' },
    { top: '45%', right: '12%' },
    { top: '55%', left: '15%' },
    { top: '65%', right: '8%' },
    { top: '75%', left: '12%' },
    { top: '20%', left: '85%' },
    { top: '40%', right: '85%' },
    { top: '60%', left: '88%' },
    { top: '80%', right: '88%' },
    { top: '30%', left: '50%' }
  ]

  return (
    <Box position="absolute" top="0" left="0" width="100%" height="100%" pointerEvents="none" zIndex="0">
      {icons.map(({ Icon, color, delay }, index) => (
        <MotionBox
          key={index}
          position="absolute"
          {...positions[index]}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0.4, 0.7, 0.5],
            scale: [0, 1.2, 0.8, 1.1, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0, -15, 0]
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.5,
            opacity: 0.9,
            transition: { duration: 0.3 }
          }}
          style={{ pointerEvents: 'auto' }}
        >
          <Icon 
            size="40px" 
            color={color}
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              cursor: 'pointer'
            }}
          />
        </MotionBox>
      ))}
    </Box>
  )
}

export default FloatingTechIcons