import { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FilterProps } from '@/lib/type';

export default function Filter({setItemFilter}: FilterProps) {
  const [selected, setSelected] = useState('All');

  const handleSelect = (label: string) => {
    setItemFilter(label);
  };

  return (
    <Box textAlign="right">
      <Menu>
        {({ isOpen }) => (
          <Box>
            <MenuButton
              isActive={isOpen}
              as={IconButton}
              icon={<HamburgerIcon />}
              variant='outline'
            >
              {selected}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSelect('All')}>All</MenuItem>
              <MenuItem onClick={() => handleSelect('Within Deadline')}>Within Deadline</MenuItem>
              <MenuItem onClick={() => handleSelect('Soon to Expire')}>Soon to Expire</MenuItem>
              <MenuItem onClick={() => handleSelect('Expired')}>Expired</MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
