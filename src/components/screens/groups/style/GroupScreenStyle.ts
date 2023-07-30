export const GroupCRUDStyles = {
    ContainerScrollView: {
        flexGrow: 1,
    },

    ContainerSafeAreaView: {
        flex: 1,
        height: '100%',
        alignItems: 'center' as 'center',
    },

    MainContainer: {
        width: '92%',
        height: '100%',
    },

    Title: {
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 14,
    },

    Input: {
        height: 50,
        fontSize: 17,
        backgroundColor: '#2F2F2F',
        borderRadius: 99,
        borderWidth: 0.7,
        marginBottom: 10,
        paddingLeft: 20,
    },

    UserSquareContainer: {
        margin: 0,
        height: 230,
    },

    UserSquareContainerNavigate: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        marginTop: 14,
    },
    UserSquareContainerNavigateText: {
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        width: 90,
    },

    UserSquareNavigateText: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        fontSize: 13,
        marginTop: 7,
        maxWidth: 90,
    },

    UserSquareRemoveContainer: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        height: 20,
        width: 20,
        position: 'relative' as 'relative',
        borderRadius: 99,
        bottom: 95,
        left: 55,
    },

    Search: {
        color: 'white',
        marginBottom: 5,
        height: 50,
        backgroundColor: '#2F2F2F',
        borderRadius: 99,
    },

    SearchResultContainer: {
        marginTop: 2,
        minHeight: 300,
    },
    InnerSearchResultContainer: {},

    SearchResultRowContainer: {
        paddingVertical: 6,
    },

    AddButton: {
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        borderWidth: 1.7,
        borderRadius: 10,
        height: 30,
        width: 30,
        margin: 10,
    },

    RestrictingContainer: {
        flexDirection: 'row' as 'row',
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
    },

    BoldText: {
        marginRight: 15,
        marginLeft: 10,
    },

    SubText: {
        marginRight: 15,
        marginLeft: -5,
        fontSize: 12,
    },

    ButtonContainer: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-around' as 'space-around',
        flexDirection: 'row' as 'row',
        width: '100%',
    },

    CrudButton: {
        justifyContent: 'center' as 'center',
        borderWidth: 1.7,
        height: 50,
    },
};

export const GroupPreviewStyle = {
    ContainerSafeAreaView: {
        alignItems: 'center' as 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column' as 'column',
    },

    SearchBar: {
        color: 'white',
        height: 50,
        width: '95%',
        backgroundColor: '#2F2F2F',
        borderRadius: 99,
    },

    GroupListContainer: {
        width: '95%',
    },

    DefaultHeight: {
        height: 20,
    },

    ButtonContainer: {
        justifyContent: 'space-around' as 'space-around',
        alignItems: 'center' as 'center',
        flexDirection: 'row' as 'row',
        width: '100%',
        position: 'absolute' as 'absolute',
        bottom: 10,
    },

    PreviewButton: {
        justifyContent: 'center' as 'center',
        borderWidth: 1.7,
        width: 160,
        height: 50,
    },
};

export const GroupRowStyle = {
    MainContainer: {
        // justifyContent: 'space-between' as 'space-between',
        flexDirection: 'row' as 'row',
        marginLeft: 30,
    },

    InnerContainer: {
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
        flexDirection: 'row' as 'row',
        width: '80%',
        height: 70,
    },

    LeftSide: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        marginBottom: 6,
    },

    ProfileContainer: {
        flexDirection: 'row' as 'row',
        marginRight: 15,
    },

    Profile: {
        backgroundColor: 'red',
        marginLeft: -20,
    },

    ProfileName: {
        fontSize: 12,
    },
};
