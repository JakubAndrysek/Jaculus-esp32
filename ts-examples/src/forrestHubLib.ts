import * as httpClient from 'httpClient';

/**
 * ForrestHub API Client Library
 *
 * A comprehensive TypeScript library for interacting with ForrestHub API endpoints.
 * Provides methods for admin configuration, game management, variable storage,
 * array operations, and database management.
 */
export class ForrestHubClient {
    private baseUrl: string;

    /**
     * Creates a new ForrestHub client instance
     * @param ip The IP address of the ForrestHub server
     * @param port The port number of the ForrestHub server (default: 4444)
     */
    constructor(ip: string, port: number = 4444) {
        this.baseUrl = `http://${ip}:${port}/api`;
    }

    // ===== ROOT =====

    /**
     * Health check endpoint
     * @returns Promise with API status
     */
    async healthCheck(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/`);
        return JSON.parse(response.body);
    }

    // ===== ADMIN CONFIG =====

    /**
     * Send message to all connected admin clients
     * @param message The message to send
     * @returns Promise with response
     */
    async sendAdminMessage(message: string): Promise<any> {
        const data = JSON.stringify({ message });
        const response = await httpClient.post(`${this.baseUrl}/admin/message`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Get count of connected SocketIO clients
     * @returns Promise with client count
     */
    async getClientsCount(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/clients/count`);
        return JSON.parse(response.body);
    }

    /**
     * Get current game status
     * @returns Promise with game status
     */
    async getGameStatus(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/game/status`);
        return JSON.parse(response.body);
    }

    /**
     * Set game status
     * @param status The new game status
     * @returns Promise with response
     */
    async setGameStatus(status: string): Promise<any> {
        const data = JSON.stringify({ status });
        const response = await httpClient.post(`${this.baseUrl}/game/status`, data, "application/json");
        return JSON.parse(response.body);
    }

    // ===== EDIT MODE =====

    /**
     * Get current edit mode state
     * @returns Promise with edit mode status
     */
    async getEditMode(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/edit_mode`);
        return JSON.parse(response.body);
    }

    /**
     * Set edit mode on/off
     * @param editModeOn Whether to turn edit mode on or off
     * @returns Promise with response
     */
    async setEditMode(editModeOn: boolean): Promise<any> {
        const data = JSON.stringify({ edit_mode_on: editModeOn });
        const response = await httpClient.post(`${this.baseUrl}/edit_mode`, data, "application/json");
        return JSON.parse(response.body);
    }

    // ===== DATABASE =====

    /**
     * Get all data from database
     * @returns Promise with all database data
     */
    async getAllData(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/db/all_data`);
        return JSON.parse(response.body);
    }

    /**
     * Delete all data from database
     * @returns Promise with response
     */
    async deleteAllData(): Promise<any> {
        const response = await httpClient.post(`${this.baseUrl}/db/delete_all_data`);
        return JSON.parse(response.body);
    }

    // ===== VARIABLES =====

    /**
     * Set a variable value for a project
     * @param project The project name
     * @param key The variable key
     * @param value The variable value
     * @returns Promise with response
     */
    async setVariable(project: string, key: string, value: any): Promise<any> {
        const data = JSON.stringify({ project, key, value });
        const response = await httpClient.post(`${this.baseUrl}/var`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Get a variable value for a project
     * @param project The project name
     * @param key The variable key
     * @param defaultValue Default value if key doesn't exist
     * @returns Promise with variable value
     */
    async getVariable(project: string, key: string, defaultValue: string = ""): Promise<any> {
        const url = `${this.baseUrl}/var?project=${encodeURIComponent(project)}&key=${encodeURIComponent(key)}&defaultValue=${encodeURIComponent(defaultValue)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    /**
     * Check if a variable exists
     * @param project The project name
     * @param key The variable key
     * @returns Promise with existence status
     */
    async variableExists(project: string, key: string): Promise<any> {
        const url = `${this.baseUrl}/var/exists?project=${encodeURIComponent(project)}&key=${encodeURIComponent(key)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    /**
     * Delete a variable
     * @param project The project name
     * @param key The variable key
     * @returns Promise with response
     */
    async deleteVariable(project: string, key: string): Promise<any> {
        const data = JSON.stringify({ project, key });
        const response = await httpClient.del(`${this.baseUrl}/var`);
        return JSON.parse(response.body);
    }

    // ===== ARRAYS =====

    /**
     * Add a record to an array
     * @param project The project name
     * @param arrayName The array name
     * @param value The record value
     * @param recordId Optional record ID
     * @returns Promise with response
     */
    async addArrayRecord(project: string, arrayName: string, value: any, recordId?: string): Promise<any> {
        const payload: any = { project, arrayName, value };
        if (recordId) {
            payload.recordId = recordId;
        }
        const data = JSON.stringify(payload);
        const response = await httpClient.post(`${this.baseUrl}/array/record`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Get a specific record from an array
     * @param project The project name
     * @param arrayName The array name
     * @param recordId The record ID
     * @returns Promise with record data
     */
    async getArrayRecord(project: string, arrayName: string, recordId: string): Promise<any> {
        const url = `${this.baseUrl}/array/record?project=${encodeURIComponent(project)}&arrayName=${encodeURIComponent(arrayName)}&recordId=${encodeURIComponent(recordId)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    /**
     * Update an existing record in an array
     * @param project The project name
     * @param arrayName The array name
     * @param recordId The record ID
     * @param value The new record value
     * @returns Promise with response
     */
    async updateArrayRecord(project: string, arrayName: string, recordId: string, value: any): Promise<any> {
        const data = JSON.stringify({ project, arrayName, recordId, value });
        const response = await httpClient.put(`${this.baseUrl}/array/record`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Delete a record from an array
     * @param project The project name
     * @param arrayName The array name
     * @param recordId The record ID
     * @returns Promise with response
     */
    async deleteArrayRecord(project: string, arrayName: string, recordId: string): Promise<any> {
        const url = `${this.baseUrl}/array/record?project=${encodeURIComponent(project)}&arrayName=${encodeURIComponent(arrayName)}&recordId=${encodeURIComponent(recordId)}`;
        const response = await httpClient.del(url);
        return JSON.parse(response.body);
    }

    /**
     * Get all records from an array
     * @param project The project name
     * @param arrayName The array name
     * @returns Promise with all records
     */
    async getAllArrayRecords(project: string, arrayName: string): Promise<any> {
        const url = `${this.baseUrl}/array/all_records?project=${encodeURIComponent(project)}&arrayName=${encodeURIComponent(arrayName)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    /**
     * Check if a record exists in an array
     * @param project The project name
     * @param arrayName The array name
     * @param recordId The record ID
     * @returns Promise with existence status
     */
    async arrayRecordExists(project: string, arrayName: string, recordId: string): Promise<any> {
        const url = `${this.baseUrl}/array/record/exists?project=${encodeURIComponent(project)}&arrayName=${encodeURIComponent(arrayName)}&recordId=${encodeURIComponent(recordId)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    /**
     * Clear all records from an array
     * @param project The project name
     * @param arrayName The array name
     * @returns Promise with response
     */
    async clearArrayRecords(project: string, arrayName: string): Promise<any> {
        const data = JSON.stringify({ project, arrayName });
        const response = await httpClient.post(`${this.baseUrl}/array/clear_records`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Get list of all projects that have arrays
     * @returns Promise with projects list
     */
    async getArrayProjects(): Promise<any> {
        const response = await httpClient.get(`${this.baseUrl}/array/projects`);
        return JSON.parse(response.body);
    }

    // ===== GAME EDITING =====

    /**
     * Create a new game
     * @param gameName The name of the new game
     * @returns Promise with response
     */
    async createNewGame(gameName: string): Promise<any> {
        const data = JSON.stringify({ game_name: gameName });
        const response = await httpClient.post(`${this.baseUrl}/game/new`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Set HTML content for a game page
     * @param gameName The name of the game
     * @param gamePage The page name (without .html extension)
     * @param gameContent The HTML content
     * @returns Promise with response
     */
    async setGamePageHtml(gameName: string, gamePage: string, gameContent: string): Promise<any> {
        const data = JSON.stringify({ game_name: gameName, game_page: gamePage, game_content: gameContent });
        const response = await httpClient.post(`${this.baseUrl}/game/page_html`, data, "application/json");
        return JSON.parse(response.body);
    }

    /**
     * Get HTML content of a game page
     * @param gameName The name of the game
     * @param gamePage The page name (without .html extension)
     * @returns Promise with page content
     */
    async getGamePageHtml(gameName: string, gamePage: string): Promise<any> {
        const url = `${this.baseUrl}/game/page_html?game_name=${encodeURIComponent(gameName)}&game_page=${encodeURIComponent(gamePage)}`;
        const response = await httpClient.get(url);
        return JSON.parse(response.body);
    }

    // ===== UTILITY METHODS =====

    /**
     * Get the base URL being used by this client
     * @returns The base URL string
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }

    /**
     * Test connection to ForrestHub server
     * @returns Promise with connection test result
     */
    async testConnection(): Promise<boolean> {
        try {
            await this.healthCheck();
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Export convenience function for quick client creation
export function createForrestHubClient(ip: string, port: number = 4444): ForrestHubClient {
    return new ForrestHubClient(ip, port);
}