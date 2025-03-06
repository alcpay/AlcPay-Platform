/**
 * System Models for App Features, Org & User Schema etc...
 */

export class CustomerOrg {
    id: string | null = null;
    name: string | null = null;
    features: OrgFeature[] | null = null;
    updatedAt: Date = new Date();
    createdAt: Date = new Date();
  }

export enum UserRole {
    GUEST = 0,
    CUSTOMER = 1,
    PARTNER = 2,
    ADMIN = 3,
}

export class User {

    name: string | null = null;
    email: string | null = null;
    lastLoginDate: Date | null = null;
    userOrgs: CustomerOrg[] | null = null;
    _passwordHash: string | null = null;

    setPassword(newPassword: string) {
        this._passwordHash = newPassword;
    }

    /**
     * Adds access to a specific organization for the user.
     * @param {string} orgId - The ID of the organization to add access to.
     */
    addOrgAccess(orgId: string): void {
        if (!this.userOrgs) {
            this.userOrgs = []; // Initialize userOrgs if it's null
        }
        const orgExists = this.userOrgs.some(org => org.id === orgId);
        if (!orgExists) {
            // @todo: add service to find orgs by id in database then save this
            // new org access to the database for the user.
            this.userOrgs.push({ id: orgId, name: null, features: null, updatedAt: new Date(), createdAt: new Date() });
        }
    }
}


export class Version {

    major: number | null = null;
    minor: number | null = null;
    patch: number | null = null;
    notes: string | null = null;
    featureFlags: Feature[] | null = null;

    /**
     * Constructs an instance of AppVersion.
     * @param {number | null} major - Major version number.
     * @param {number | null} minor - Minor version number.
     * @param {number | null} patch - Patch version number.
     * @param {Date | null} endOfLifeDate - End of life date for the version.
     * @param {boolean | null} isReleasePreview - Indicates if this is a release preview.
     * @param {string | null} releaseNotes - Notes associated with the release.
     */
    constructor(
        major: number | null = null, 
        minor: number | null = null,
        patch: number | null = null,
        notes: string | null = null,
    ) {
        this.major = major; // Major version number
        this.minor = minor; // Minor version number
        this.patch = patch; // Patch version number
        this.notes = notes; // Release notes
    }

    /**
     * Generates the build number string for the version.
     * @returns {string} The build number string.
     */
    getBuildNumber(): string {
        return `v${this.major}.${this.minor}.${this.patch}`;
    }

}

export class Feature {
    name: string | null = null;
    summary: string | null = null;
    docUrl: string | null = null;
    appVersion: Version | null = null;
    restrictedAccess: boolean | null = null;
    orgs: OrgFeature[] | null = new Array<OrgFeature>();
}

export class OrgFeature {
    featureId: Feature | null = null;
    orgId: CustomerOrg | null = null;
}
