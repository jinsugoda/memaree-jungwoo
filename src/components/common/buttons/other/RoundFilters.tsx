import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

// custom components
import ToggleButton from 'components/common/buttons/other/ToggleButton';

//sstyles
import { FilterStyles } from 'styles';

export interface FilterState {
    [filterId: string]: {
        isOn: boolean;
        text: string;
    };
}
interface FilterButtonProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    containerStyle?: StyleProp<ViewStyle>;
}

// buttonId is used here, not sure why ides says it isn't, dont touch
export const FilterActiveFilters = (filters: FilterState) =>
    Object.entries(filters)
        .filter(([buttonId, buttonState]) => buttonState.isOn)
        .map(([buttonId]) => buttonId);
const filters = {
    ALL: { text: 'All', isOn: true },
    Shared: { text: '1', isOn: false },
    Recall: { text: '2', isOn: false },
    Dreams: { text: '3', isOn: false },
};

const RoundFilters = (props: FilterButtonProps) => {
    const [dropdown, setDropdown] = useState(false);
    // const activefilters = useMemo(() => FilterActiveFilters(props?.filters), [props?.filters]);
    const activefilters = useMemo(() => FilterActiveFilters(filters), [filters]);
    const [noFilters, setNoFilters] = useState<boolean>(activefilters?.length === 0);

    const handleButtonToggle = (buttonId: string) => {
        const newButtonState = { ...props?.filters };
        newButtonState[buttonId].isOn = !newButtonState[buttonId]?.isOn;
        props?.setFilters(newButtonState);
    };

    const noFiltersToggle = () => {
        props?.setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            Object.keys(newFilters).forEach((filterId) => {
                newFilters[filterId].isOn = noFilters;
            });
            return newFilters;
        });
        setNoFilters((prev) => !prev);
    };

    useEffect(() => {
        setNoFilters(activefilters?.length === 0);
    }, [activefilters]);

    const ToggleButtons = () => {
        return (
            <>
                <ToggleButton
                    key={`ALLTOGGLED`}
                    buttonId={'ALL'}
                    isOn={noFilters}
                    onToggle={() => noFiltersToggle()}
                    text={'All'}
                />
                {Object.keys(props?.filters).map((key, i) => {
                    return (
                        <ToggleButton
                            key={`${key}${i}-RoundFilters`}
                            buttonId={key}
                            isOn={props?.filters[key]?.isOn}
                            onToggle={() => handleButtonToggle(key)}
                            text={props?.filters[key]?.text}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <View
            style={[
                dropdown && FilterStyles.laneFilterContainerDown,
                FilterStyles.laneFilterContainer,
                props?.containerStyle,
            ]}
        >
            {/* <DropdownButton dropdown={dropdown} setDropdown={setDropdown}/>
            {dropdown?
                <ToggleButtons />
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <ToggleButtons/>
                </ScrollView>
            } */}
        </View>
    );
};

export default RoundFilters;
