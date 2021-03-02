import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import List, { Item } from '@codeday/topo/Atom/List';
import Box, { Flex } from '@codeday/topo/Atom/Box';
import Input from '@codeday/topo/Atom/Input/Text';
import { IconButton } from '@chakra-ui/core';
import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';
import Button from '@codeday/topo/Atom/Button';
import { SearchQuery } from './search.gql';

const getProjects = async (inputText) => {
  try {
    return await apiFetch(print(SearchQuery), { search: inputText });
  } catch (err) {
    return { error: err };
  }
};

export default function Autocomplete(props) {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    onInputValueChange: async ({ inputValue }) => {
      setInputValue(inputValue);
      const projects = await getProjects(inputValue);
      setItems(
        projects.showcase.projects.map(({ name }) => name)
      );
    },
    items,
  });
  return (
    <Box
      style={{ position: 'relative' }}
      mr={-4}
    >
      <Flex {...getComboboxProps()}>
        <Input {...getInputProps()} onChange={(e) => { props.onChange(e); getInputProps().onChange(e); }} />
        <Button {...getToggleButtonProps()} hidden />
      </Flex>
      <List
        {...getMenuProps()}
        flex={1}
        overflowY="auto"
        styleType="disc"
        style={{
          position: 'absolute', width: '100%', border: '1px solid grey', borderRadius: '5px',
        }}
        hidden={!isOpen || items.length === 0}
      >
        {isOpen && items.slice(0, 7).map((item, index) => (
          <Item
            {...getItemProps({ item, index })}
            itemIndex={index}
            backgroundColor={highlightedIndex === index ? 'blue.500' : 'white'}
            key={index}
            px={4}
            py={2}
            cursor="pointer"
            style={{ textAlign: 'left', outline: '1px solid grey' }}
          >
            {item}
          </Item>
        ))}
      </List>
    </Box>
  );
}
