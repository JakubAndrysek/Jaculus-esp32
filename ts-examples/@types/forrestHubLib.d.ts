declare module "forrestHubLib" {
    /**
     * ForrestHub API Client Library Types
     */

    /**
     * ForrestHub API Client Class
     *
     * Provides comprehensive access to all ForrestHub API endpoints including
     * admin configuration, game management, variable storage, array operations,
     * and database management.
     */
    export class ForrestHubClient {
        /**
         * Creates a new ForrestHub client instance
         * @param ip The IP address of the ForrestHub server
         * @param port The port number of the ForrestHub server (default: 4444)
         */
        constructor(ip: string, port?: number);

        // Root endpoints
        /**
         * Health check endpoint
         * @returns Promise with API status
         */
        healthCheck(): Promise<any>;

        // Admin Config endpoints
        /**
         * Send message to all connected admin clients
         * @param message The message to send
         * @returns Promise with response
         */
        sendAdminMessage(message: string): Promise<any>;

        /**
         * Get count of connected SocketIO clients
         * @returns Promise with client count
         */
        getClientsCount(): Promise<any>;

        /**
         * Get current game status
         * @returns Promise with game status
         */
        getGameStatus(): Promise<any>;

        /**
         * Set game status
         * @param status The new game status
         * @returns Promise with response
         */
        setGameStatus(status: string): Promise<any>;

        // Edit Mode endpoints
        /**
         * Get current edit mode state
         * @returns Promise with edit mode status
         */
        getEditMode(): Promise<any>;

        /**
         * Set edit mode on/off
         * @param editModeOn Whether to turn edit mode on or off
         * @returns Promise with response
         */
        setEditMode(editModeOn: boolean): Promise<any>;

        // Database endpoints
        /**
         * Get all data from database
         * @returns Promise with all database data
         */
        getAllData(): Promise<any>;

        /**
         * Delete all data from database
         * @returns Promise with response
         */
        deleteAllData(): Promise<any>;

        // Variable endpoints
        /**
         * Set a variable value for a project
         * @param project The project name
         * @param key The variable key
         * @param value The variable value
         * @returns Promise with response
         */
        setVariable(project: string, key: string, value: any): Promise<any>;

        /**
         * Get a variable value for a project
         * @param project The project name
         * @param key The variable key
         * @param defaultValue Default value if key doesn't exist
         * @returns Promise with variable value
         */
        getVariable(project: string, key: string, defaultValue?: string): Promise<any>;

        /**
         * Check if a variable exists
         * @param project The project name
         * @param key The variable key
         * @returns Promise with existence status
         */
        variableExists(project: string, key: string): Promise<any>;

        /**
         * Delete a variable
         * @param project The project name
         * @param key The variable key
         * @returns Promise with response
         */
        deleteVariable(project: string, key: string): Promise<any>;

        // Array endpoints
        /**
         * Add a record to an array
         * @param project The project name
         * @param arrayName The array name
         * @param value The record value
         * @param recordId Optional record ID
         * @returns Promise with response
         */
        addArrayRecord(project: string, arrayName: string, value: any, recordId?: string): Promise<any>;

        /**
         * Get a specific record from an array
         * @param project The project name
         * @param arrayName The array name
         * @param recordId The record ID
         * @returns Promise with record data
         */
        getArrayRecord(project: string, arrayName: string, recordId: string): Promise<any>;

        /**
         * Update an existing record in an array
         * @param project The project name
         * @param arrayName The array name
         * @param recordId The record ID
         * @param value The new record value
         * @returns Promise with response
         */
        updateArrayRecord(project: string, arrayName: string, recordId: string, value: any): Promise<any>;

        /**
         * Delete a record from an array
         * @param project The project name
         * @param arrayName The array name
         * @param recordId The record ID
         * @returns Promise with response
         */
        deleteArrayRecord(project: string, arrayName: string, recordId: string): Promise<any>;

        /**
         * Get all records from an array
         * @param project The project name
         * @param arrayName The array name
         * @returns Promise with all records
         */
        getAllArrayRecords(project: string, arrayName: string): Promise<any>;

        /**
         * Check if a record exists in an array
         * @param project The project name
         * @param arrayName The array name
         * @param recordId The record ID
         * @returns Promise with existence status
         */
        arrayRecordExists(project: string, arrayName: string, recordId: string): Promise<any>;

        /**
         * Clear all records from an array
         * @param project The project name
         * @param arrayName The array name
         * @returns Promise with response
         */
        clearArrayRecords(project: string, arrayName: string): Promise<any>;

        /**
         * Get list of all projects that have arrays
         * @returns Promise with projects list
         */
        getArrayProjects(): Promise<any>;

        // Game Editing endpoints
        /**
         * Create a new game
         * @param gameName The name of the new game
         * @returns Promise with response
         */
        createNewGame(gameName: string): Promise<any>;

        /**
         * Set HTML content for a game page
         * @param gameName The name of the game
         * @param gamePage The page name (without .html extension)
         * @param gameContent The HTML content
         * @returns Promise with response
         */
        setGamePageHtml(gameName: string, gamePage: string, gameContent: string): Promise<any>;

        /**
         * Get HTML content of a game page
         * @param gameName The name of the game
         * @param gamePage The page name (without .html extension)
         * @returns Promise with page content
         */
        getGamePageHtml(gameName: string, gamePage: string): Promise<any>;

        // Utility methods
        /**
         * Get the base URL being used by this client
         * @returns The base URL string
         */
        getBaseUrl(): string;

        /**
         * Test connection to ForrestHub server
         * @returns Promise with connection test result
         */
        testConnection(): Promise<boolean>;
    }

    /**
     * Convenience function for creating a ForrestHub client
     * @param ip The IP address of the ForrestHub server
     * @param port The port number of the ForrestHub server (default: 4444)
     * @returns A new ForrestHubClient instance
     */
    export function createForrestHubClient(ip: string, port?: number): ForrestHubClient;

    // Common response interfaces (based on typical API patterns)
    export interface ApiResponse {
        status?: string;
        message?: string;
        data?: any;
        error?: string;
    }

    export interface VariableResponse extends ApiResponse {
        value?: any;
        exists?: boolean;
    }

    export interface ArrayResponse extends ApiResponse {
        records?: any[];
        record?: any;
        count?: number;
    }

    export interface GameResponse extends ApiResponse {
        content?: string;
        game_name?: string;
        game_page?: string;
    }

    export interface ClientsResponse extends ApiResponse {
        count?: number;
        clients?: any[];
    }

    export interface DatabaseResponse extends ApiResponse {
        data?: any;
        cleared?: boolean;
    }
}
