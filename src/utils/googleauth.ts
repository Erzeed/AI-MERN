import { google } from "googleapis";
import "dotenv/config";

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // `${process.env.ACCES_POINT}/login`
    /**
     * To get access_token and refresh_token in server side,
     * the data for redirect_uri should be postmessage.
     * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
     */
    'postmessage'
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

export const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
})