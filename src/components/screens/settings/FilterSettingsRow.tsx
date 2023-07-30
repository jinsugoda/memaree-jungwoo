import React, { useState } from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from '@rneui/base';

// types
import { FilterState } from 'components/common/buttons/other/RoundFilters';

// styles
import { SettingStyles } from 'styles';

interface FilterButtonProps {
    data: FilterState[];
    onPress: (params: FilterState[]) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const FilterSettingsRow = ({ data, onPress, containerStyle }: FilterButtonProps) => {
    // Temporary data input
    const [tempFilter, setTempFilter] = useState<FilterState[]>(data);

    return (
        <View style={[containerStyle]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Icon
                    name="pluscircleo"
                    type="antdesign"
                    size={SettingStyles.LaneFilterSettingsAddIconSize}
                    style={SettingStyles.LaneButton}
                />
                {tempFilter.map((element, i) => {
                    return (
                        <Button
                            key={`FilterSettingsRow-${element}-${i}`}
                            mode="outlined"
                            textColor="black"
                            labelStyle={SettingStyles.LaneButtonLabel}
                            style={SettingStyles.LaneButton}
                            onPress={() => alert('yay')}
                        >
                            {element?.text}
                        </Button>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default FilterSettingsRow;
