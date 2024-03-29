import useStore from '../hooks/useStore';
import styled from 'styled-components';
import Select from 'react-select';
import ValueType from 'react-select';

const Searchbar = () => {
  const {
    pokeTypesList,
    filterSelect,
    setFilterSelect,
    searchInput,
    setSearchInput,
  } = useStore(state => state);

  interface Props {
    value: string;
    label: string;
    icon: JSX.Element;
  }

  let options: Array<Props> | undefined = [];
  const createOptions = () => {
    options = pokeTypesList?.results.slice(0, 18).map(singleType => {
      return {
        label: singleType.name,
        value: singleType.name,
        icon: (
          <img
            src={`./images/type-${singleType.name}.svg`}
            height="25px"
            alt={singleType.name}
          ></img>
        ),
      };
    });
  };
  createOptions();

  const styles = {
    control: (styles: any) => ({
      ...styles,
      border: '2px solid black',
      backgroundColor: '#f2f2f2',
      fontSize: '95%',
    }),
    placeholder: () => ({
      color: 'gray',
    }),
    valueContainer: () => ({
      display: 'flex',
      marginLeft: '15px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: () => ({
      padding: '0px',
      margin: '0px',
      display: 'flex',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      border: '2px solid black',
      borderRadius: '10px',
      backgroundColor: 'lightgray',
      width: '100px',
      display: filterSelect.length >= 2 ? 'none' : 'static',
    }),
  };

  const getLabelFrom: any = (event: Props) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {event.icon}
      </div>
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedInputString = event.target.value.trim();
    if (
      trimmedInputString !== '' &&
      !trimmedInputString.match(/^[a-zA-Z0-9_.\- ]+$/)
    ) {
      setSearchInput(trimmedInputString.toLocaleLowerCase(), true);
    } else {
      setSearchInput(trimmedInputString.toLocaleLowerCase(), false);
    }
  };

  type TOption = [
    {
      label: string | number;
      value: string | number;
      icon: JSX.Element;
    }
  ];

  const handleDropdownChange = (newSelections: any) => {
    const filterList = newSelections.map((prop: any): string => {
      return prop.value;
    });
    setFilterSelect(filterList);
  };

  return (
    <SearchContainer>
      <Description>
        Search for Pokémon by name or using the National Pokédex number.
      </Description>
      <SearchInputContainer>
        <ReactSelect
          options={options}
          aria-label="Filter types"
          name="Filter types"
          isMulti
          getOptionLabel={getLabelFrom}
          isSearchable={false}
          placeholder="Filter for Pokemon Types"
          styles={styles}
          defaultValue={filterSelect}
          onChange={handleDropdownChange}
          isOptionDisabled={() => filterSelect.length >= 2}
        />
        <SearchLabel>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>

          <SearchInput
            onChange={handleChange}
            placeholder="What Pokémon are you looking for?"
            type="text"
          />
        </SearchLabel>
      </SearchInputContainer>
      {searchInput.errorState && (
        <ErrorMessage>
          Please don&apos;t any use special characters
        </ErrorMessage>
      )}
    </SearchContainer>
  );
};

export default Searchbar;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  margin-top: 100px;
  color: var(--font-color-grey);
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const SearchInput = styled.input`
  background: #f2f2f2;
  border-radius: 10px;
  width: 320px;
  height: 40px;
  padding: 20px 15px;
`;

const SearchLabel = styled.label`
  position: relative;
  svg {
    position: absolute;
    right: 25px;
    top: 15px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ReactSelect = styled(Select)`
  width: 280px;
  margin-bottom: 5px;
`;
