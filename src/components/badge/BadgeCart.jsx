
import Badge from '@mui/material/Badge';

export const BadgeCart = ({badgeContent,children})=>{
    
    return(
        <Badge badgeContent={badgeContent} color={'secondary'}>
            {children}
      </Badge>
    )
}