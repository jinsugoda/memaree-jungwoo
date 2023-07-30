import React, { memo, useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';

// context
import { useFeedContext } from '../FeedContext';

// 3rd party hooks
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

// gpl queries
import { MemareeFlipsidePostsQry } from '../../gql/MemareeFlipsidePostsQry';
import { MemareePostsQry } from '../../gql/MemareePostsQry';

// custom components
import FeedComponent from '../../composables/FeedComponent';
import AddToYourMemaree from 'components/screens/feed/emptyFeed/addToMessage/AddToYourMemaree';
import { useDispatch, useSelector } from 'react-redux';
import { setRemembered } from 'store/slices/memareeScreenSlice';
import EnableMemareeFlipSide from '../../emptyFeed/needPermition/EnableMemareeFlipSide';

// constants
const COLUMN_COUNT = 3;
const POST_LIMIT = 48;
const GEO_RADIUS = 50000000;
export const postsKey = 'getPosts';
const postsKey_flipped = 'getMemareeFlipsidePosts';
export const initialVariables = {
    input: {
        limit: POST_LIMIT,
    },
};

type MemareeProps = NativeStackScreenProps<RootStackParamList, 'MemareeScreen'>;

const MemareeScreen = (props: MemareeProps) => {
    const { isFlippedMemaree, setIsFlippedMemaree } = useFeedContext();
    const params = props?.route?.params;

    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    let remembered = useSelector(
        (state: { memaree: { remembered: boolean } }) => state?.memaree?.remembered,
    );
    useEffect(() => {
        checkAndSetLocationPermission();
        (async () => {
            try {
                let { status } = await Location?.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                let location = await Location?.getCurrentPositionAsync({});
                setLatitude(location?.coords?.latitude);
                setLongitude(location?.coords?.longitude);
            } catch (error) {
                console.error('Error retrieving location:', error);
            }
        })();
    }, []);

    // when the user flips, the flip-side data is fetched
    useEffect(() => {
        if (isFlippedMemaree) {
            refetch_flipped(initialVariables_flipped);
        }
    }, [isFlippedMemaree]);

    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                checkAndSetLocationPermission();
                if (!isFlippedMemaree && remembered) {
                    dispatch(setRemembered(false));
                    refetch();
                } else {
                    console.log('setting is flipped m false');
                    setIsFlippedMemaree(false); // everytime the focus changes, this is defaulted to normal mode
                }
            }
        }, [isFocused]),
    );

    const checkAndSetLocationPermission = async()=> {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setHasLocationPermission(false);
          console.log('Location permission not granted');
          return;
        }
        setHasLocationPermission(true);
        
     
    }  

    let initialVariables_flipped = {
        input: {
            limit: POST_LIMIT,
            lat: latitude,
            lon: longitude,
            distance: GEO_RADIUS,
        },
    };
    // if the lat and long are retrieved, updating the inputs
    if (latitude && longitude) {
        initialVariables_flipped = {
            input: {
                limit: POST_LIMIT,
                lat: latitude,
                lon: longitude,
                distance: GEO_RADIUS,
            },
        };
    }

    const { loading, error, data, fetchMore, refetch } = useQuery(MemareePostsQry, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
    });

    const {
        loading: loading_flipped,
        error: error_flipped,
        data: data_flipped,
        fetchMore: fetchMore_flipped,
        refetch: refetch_flipped,
    } = useQuery(MemareeFlipsidePostsQry, {
        variables: initialVariables_flipped,
        fetchPolicy: 'cache-and-network',
        // skip: !latitude || !longitude, // Skip the query if latitude or longitude is not available
    });
    return (
        <>
        {  !hasLocationPermission && isFlippedMemaree ?
            <EnableMemareeFlipSide/>
            :
            <FeedComponent
                feedType={'memaree'}
                columnCount={isFlippedMemaree ? 1 : COLUMN_COUNT}
                emptyComponent={<AddToYourMemaree />}
                openPostOptionsBottomSheet={params?.openPostOptionsBottomSheet}
                openSharePostBottomSheet={params?.openSharePostBottomSheet}
                postsKey={isFlippedMemaree ? postsKey_flipped : postsKey}
                variables={isFlippedMemaree ? initialVariables_flipped : initialVariables}
                posts={isFlippedMemaree ? data_flipped?.[postsKey_flipped] : data?.[postsKey]}
                loading={isFlippedMemaree ? loading_flipped : loading}
                error={isFlippedMemaree ? error_flipped : error}
                fetchMore={isFlippedMemaree ? fetchMore_flipped : fetchMore}
                refetch={isFlippedMemaree ? refetch_flipped : refetch}
            />
        }
        
        </>
    );
};

export default memo(MemareeScreen);
