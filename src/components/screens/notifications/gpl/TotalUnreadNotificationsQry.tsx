import { gql } from '@apollo/client';

export default gql`
    query TotalUnreadNotifications {
        totalUnreadNotifications
    }
`;
