<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class BackupCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup database and files.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $backupPath = storage_path('backups');
        $dbName = env('DB_DATABASE');
        $backupFile = $backupPath . '/' . $dbName . '-' . date('Y-m-d-H-i-s') . '.sql';

        if(!is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        exec("mysqldump -u" . env('DB_USERNAME') . " -p" . env('DB_PASSWORD') . " " . $dbName . " > " . $backupFile);
        
        // exec("pg_dump -U " . env('DB_USERNAME') . " -W " . env('DB_PASSWORD') . " -F t " . $dbName . " > " . $backupFile);
        
        $this->info('Backup completed successfully.');

        $filesBackupPath = storage_path('app/backups');
        $timestamp = date('Y-m-d-H-i-s');
        $zipFileName = "files_backup_{$timestamp}.zip";

        if(!file_exists($filesBackupPath)) {
            mkdir($filesBackupPath, 0755, true);
        }

        $files = Storage::allFiles('/');
        $zip = new \ZipArchive();
        $zip->open($filesBackupPath . '/' . $zipFileName, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);

        foreach($files as $file) {
            $zip->addFile(storage_path('app/' . $file), $file);
        }

        $zip->close();

        $this->info('Files backup completed successfully.');


    }
}
