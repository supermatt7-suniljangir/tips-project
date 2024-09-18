import { Box, Typography, Link, Card } from '@mui/material';

const Footer = () => {
  const leftLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ];

  const rightLinks = [
    { name: 'Cookies', href: '#' },
    { name: 'Refunds', href: '#' },
    { name: 'License', href: '#' }
  ];

  return (
    <Card
    component={'footer'}
    elevation={8}
      sx={{
        backgroundColor: 'primary.light',
        padding: '20px 0',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Links Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems:'center',
          margin: '0 auto',
          width:'90%',
          padding: '10px 0',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
          gap: '10px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '15px' }}>
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              color="inherit"
              underline="none" // Removes underline
              sx={{ '&:hover': { textDecoration: 'underline' } }} // Underline on hover
            >
              <Typography>{link.name}</Typography>
            </Link>
          ))}
        </Box>
 {/* Logo */}
 <Box sx={{ padding: '10px 0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Tips Project
        </Typography>
      </Box>
        <Box sx={{ display: 'flex', gap: '15px' }}>
          {rightLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              color="inherit"
              underline="none" // Removes underline
              sx={{ '&:hover': { textDecoration: 'underline' } }} // Underline on hover
            >
<Typography>{link.name}</Typography>
            </Link>
          ))}
        </Box>
      </Box>

     

      {/* Copyright */}
      <Typography variant="body2" color="textSecondary" sx={{
        ml:{md:5}
      }}>
        © 2024 Tips Project
      </Typography>
    </Card>
  );
};

export default Footer;
