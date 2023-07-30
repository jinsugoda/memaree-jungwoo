import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';

// custom components
import CircleColumnButton from 'components/common/buttons/other/CircleColumnButton';

// styles
import { CircleStyles } from 'styles';

const PeopleScreen = () => {
    // const ref = React.useRef(null);

    // const { colors }: CustomTheme = useTheme();

    // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    // const [userDataList, setUserDataList] = useState([]);

    // let userInput = useSelector((state: { search: { userInput: string } }) => state.search.userInput);

    // const { loading: userLoading, error: userError, data: userData } = useQuery(SEARCH_USERS, {
    //   variables: { input: userInput },
    //   fetchPolicy: 'network-only',
    //   skip: userInput === '',
    //   onCompleted: (newData) => {
    //     newData.searchUsers !== undefined && updateData(newData.searchUsers)
    //   },
    // });

    // const updateData = useCallback((list) => {
    //     setUserDataList([...list]);
    //   }, [setUserDataList]);

    //   const [searchQuery, setSearchQuery] = React.useState('');
    // const [hasFocus, setHasFocus] = React.useState(false);

    // // const [searchType, setSearchType] = React.useState('users'); // ['users', 'posts']

    // const onChangeSearch = (query) =>{
    //     setSearchQuery(query)
    // };

    // if (userError) return <MemareeText>Error...</MemareeText>;

    return (
        <SafeAreaView>
            <View style={CircleStyles.circleContainer}>
                {/* <Searchbar
                style = {{color:'white', 
                    height: 50,    
                    width: '95%', 
                    backgroundColor: '#2F2F2F', 
                    borderRadius: 99}}
                placeholder="Search"
                // placeholder="Search people"
                placeholderTextColor={colors.text}
                onChangeText={onChangeSearch}
                value={searchQuery}
                iconColor={colors.text}
                    cursorColor={colors.text}
                    inputStyle={{ color: colors.text }}
                // onIconPress={()=>ref.current.focus()}
                onFocus={() => setHasFocus(true) }
                onBlur={() => setHasFocus(false) }
                ref={ref}
            /> */}
                <ScrollView style={{ width: '100%' }}>
                    {
                        // searchQuery === '' &&
                        <View style={CircleStyles.circleNavigationColumnContainer}>
                            {/* <CircleColumnButton screenTitle={"Request"} navigationDestination={'CircleUserListRequest'} circleType={"request"} text={"Request"}/> */}
                            <CircleColumnButton
                                screenTitle={'Remembering'}
                                navigationDestination={'CircleUserList'}
                                circleType={'Remembering'}
                                text={'Remembering'}
                            />
                            <CircleColumnButton
                                screenTitle={'Remembered By'}
                                navigationDestination={'CircleUserList'}
                                circleType={'Remember By'}
                                text={'Remembered By'}
                            />
                            <CircleColumnButton
                                screenTitle={'Circle'}
                                navigationDestination={'CircleUserList'}
                                circleType={'Circle'}
                                text={'Circle'}
                            />
                        </View>
                    }
                </ScrollView>
            </View>
            <View style={{ paddingBottom: 45 }}>
                {
                    // searchQuery !== ''&&
                    // <UserList users={searchResult}/>
                }
            </View>
        </SafeAreaView>
    );
};
export default PeopleScreen;
