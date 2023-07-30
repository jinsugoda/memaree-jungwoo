import React from 'react';
import { Text, View, LogBox, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// types
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';

// custom components
import MemareeText from '../textAndInputs/MemareeText';

// redux
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/slices/userSlice';

// styles
import { PostcardStyles } from 'styles';
import { CustomTheme } from 'styles/theme/customThemeProps';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons/faCommentSlash';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const REMOVE_POST_MUTATION = gql`
    mutation removePost($input: RemovePostInput!) {
        removePost(input: $input) {
            status
        }
    }
`;

interface PostOptionsBottomSheet {
    bottomSheetRef: React.MutableRefObject<BottomSheetMethods>;
    postId: string;
    posterId: string;
}

const PostOptionsModal = ({ bottomSheetRef, postId, posterId }: PostOptionsBottomSheet) => {
    const userId = useSelector(selectUserId);
    const [removePostMutation] = useMutation(REMOVE_POST_MUTATION);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { colors }: CustomTheme = useTheme();
    const Recall = () => {
        //postId
    };
    const Dreams = () => {
        //postId
    };
    const Forget = () => {
        //postId
    };
    const BlockUser = () => {
        //posterId
    };
    const ReportPost = () => {
        //postId
    };

    const RemovePost = () => {
        if (posterId === userId) {
            const variables = {
                input: { postId: postId },
            };

            removePostMutation({ variables });

            bottomSheetRef?.current?.close();

            navigation.navigate('HomeScreen');
        }
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['35%']}
            index={-1}
            backdropComponent={(props: BottomSheetBackdropProps) => {
                return (
                    <BottomSheetBackdrop
                        {...props}
                        pressBehavior={'close'}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                );
            }}
            enablePanDownToClose={true}
            enableOverDrag={true}
            backgroundStyle={{ backgroundColor: colors.background }}
        >
            <View>
                {/* <TouchableOpacity onPress={()=>Recall} style = {[PostcardStyles.actionContainer, {backgroundColor: colors.background}]}>
            <FontAwesomeIcon color={colors.text} icon={faPlus} size={27} />
            <Text style = {[PostcardStyles.postMenuScreenModelText, {color: colors.text}]}>Recall</Text>
            </TouchableOpacity>

            <Divider orientation="vertical" width={1} />
            <TouchableOpacity onPress={()=>Dreams}  style = {[PostcardStyles.actionContainer, {backgroundColor: colors.background}]}>
            <FontAwesomeIcon color={colors.text} icon={faPlus} size={27} />
            <Text style = {[PostcardStyles.postMenuScreenModelText, {color: colors.text}]}>Dreams</Text>
            </TouchableOpacity>

            <Divider orientation="vertical" width={1} />
            <TouchableOpacity onPress={()=>Forget}  style = {[PostcardStyles.actionContainer, {backgroundColor: colors.background}]}>
            <FontAwesomeIcon color={colors.text} icon={faMinus} size={27} />
            <Text style = {[PostcardStyles.postMenuScreenModelText, {color: colors.text}]}>Forget</Text>
            </TouchableOpacity>

            <Divider orientation="vertical" width={1} />
            <TouchableOpacity  onPress={()=>BlockUser}  style = {[PostcardStyles.actionContainer, {backgroundColor: colors.background}]}>
            <FontAwesomeIcon color={colors.text} icon={faBan} size={27} />
            <Text style = {[PostcardStyles.postMenuScreenModelText, {color: colors.text}]}>Block User</Text>
            </TouchableOpacity>

            <Divider orientation="vertical" width={0.8} />
            <TouchableOpacity onPress={()=>ReportPost} style = {[PostcardStyles.actionContainer, {backgroundColor: colors.background}]}>
            <FontAwesomeIcon color={colors.text} icon={faCommentSlash} size={27} />
            <Text style = {[PostcardStyles.postMenuScreenModelText, {color: colors.text}]}>Report Post</Text>
            </TouchableOpacity> */}

                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>
                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>
                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>

                {posterId === userId && (
                    <TouchableOpacity
                        onPress={() => RemovePost()}
                        style={[
                            PostcardStyles.actionContainer,
                            { backgroundColor: colors.background },
                        ]}
                    >
                        <MemareeText
                            style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                        >
                            Remove Post
                        </MemareeText>
                    </TouchableOpacity>
                )}

                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>
                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>
                <MemareeText
                    style={[PostcardStyles.postMenuScreenModelText, { color: colors.text }]}
                ></MemareeText>
            </View>
        </BottomSheet>
    );
};

export default PostOptionsModal;
