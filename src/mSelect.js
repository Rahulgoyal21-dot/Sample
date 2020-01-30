import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, CheckBox, Select, Text } from "grommet";
import { FormClose } from "grommet-icons";

const maxSelectedOptionsToRender = 4;

const MultiSelect = ({
  labelKey,
  onChange: userOnChange,
  options,
  ...rest
}) => {
  // FIXME: getting rerendered twice on search
  useEffect(() => console.log("---RERENDERED---"));

  // to differentiate between array of string and array of objects
  let areOptionsString = true;
  if (options[0]) {
    areOptionsString = typeof options[0] === "string";
  }

  const defaultSelectedOptions = [];

  const [optionsList, setOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(
    defaultSelectedOptions
  );
  const [searching, setSearching] = useState(false);

  const clearSelectedOptions = () => {
    userOnChange([]);
    setSelectedOptions(defaultSelectedOptions);
  };

  const renderOption = option => {
    return (
      <Box direction="row" align="center" pad="small" flex={false}>
        <CheckBox
          checked={
            areOptionsString
              ? selectedOptions.some(selectedOpt => selectedOpt === option)
              : selectedOptions.some(
                  selectedOpt => selectedOpt[labelKey] === option[labelKey]
                )
          }
          label={
            areOptionsString ? (
              <Text size="small">{option}</Text>
            ) : (
              <Text size="small">{option[labelKey]}</Text>
            )
          }
          onChange={() => {}}
        />
      </Box>
    );
  };

  const renderSelectedOptions = () => {
    return (
      <Box
        direction="row"
        gap="xsmall"
        pad={{ left: "small", vertical: "small" }}
        align="center"
        flex
      >
        <Box
          background="brand"
          round="medium"
          align="center"
          justify="center"
          pad={{ horizontal: "xsmall" }}
          style={{ minWidth: "21px" }}
        >
          <Text size="small">{selectedOptions.length}</Text>
        </Box>
        <Box flex>
          <Text size="small" truncate>
            {areOptionsString
              ? selectedOptions
                  .slice(0, maxSelectedOptionsToRender)
                  .map(opt => opt)
                  .join(", ")
              : selectedOptions
                  .slice(0, maxSelectedOptionsToRender)
                  .map(opt => opt[labelKey])
                  .join(", ")}
          </Text>
        </Box>
        <Button
          href="#"
          onFocus={event => event.stopPropagation()}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            clearSelectedOptions();
          }}
        >
          <Box background="gray" round="full">
            <FormClose style={{ width: "12px", height: "12px" }} />
          </Box>
        </Button>
      </Box>
    );
  };

  return (
    <Select
      closeOnChange={false}
      emptySearchMessage="No result found"
      multiple
      onChange={({ option }) => {
        const newSelectedOptions = [...selectedOptions];
        const seasonIndex = newSelectedOptions
          .map(opt => (areOptionsString ? opt : opt[labelKey]))
          .indexOf(areOptionsString ? option : option[labelKey]);
        if (seasonIndex >= 0) {
          newSelectedOptions.splice(seasonIndex, 1);
        } else {
          newSelectedOptions.push(option);
        }

        const selectedOptionValues = areOptionsString
          ? newSelectedOptions.map(opt => opt)
          : newSelectedOptions.map(opt => opt[labelKey]);

        setSelectedOptions(newSelectedOptions);
        setOptions(
          optionsList.sort((p1, p2) => {
            let p1Exists;
            let p2Exists;
            if (areOptionsString) {
              p1Exists = selectedOptionValues.includes(p1);
              p2Exists = selectedOptionValues.includes(p2);
            } else {
              p1Exists = selectedOptionValues.includes(p1[labelKey]);
              p2Exists = selectedOptionValues.includes(p2[labelKey]);
            }

            if (!p1Exists && p2Exists) {
              return 1;
            }
            if (p1Exists && !p2Exists) {
              return -1;
            }
            if (areOptionsString) {
              if (p1.toLowerCase() < p2.toLowerCase()) {
                return -1;
              }
            } else {
              if (p1[labelKey].toLowerCase() < p2[labelKey].toLowerCase()) {
                return -1;
              }
            }
            return 1;
          })
        );
        userOnChange(newSelectedOptions);
      }}
      onSearch={query => {
        setSearching(true);
        setTimeout(() => {
          setSearching(false);
          setOptions(
            options.filter(opt =>
              areOptionsString
                ? opt.toLowerCase().indexOf(query.toLowerCase()) >= 0
                : opt[labelKey].toLowerCase().indexOf(query.toLowerCase()) >= 0
            )
          );
        }, 500);
      }}
      options={optionsList}
      placeholder="Multi Select"
      searchPlaceholder="Search"
      selected={[]}
      value={selectedOptions.length ? renderSelectedOptions() : undefined}
    >
      {renderOption}
    </Select>
  );
};

MultiSelect.defaultProps = {
  // lebelKey is required when working with array of objects
  labelKey: "",
  options: ["option 1", "option 2", "option 3", "option 4", "Select All"],
  onChange: () => {}
};

MultiSelect.propTypes = {
  labelKey: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default MultiSelect;
