"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fsp = require("fs-promise");
const io_1 = require("../util/io");
const util_1 = require("../util/util");
const settings_1 = require("../lib/settings");
if (process.env.LONGJOHN) {
    console.log("=== USING LONGJOHN ===");
    const longjohn = require("longjohn");
    longjohn.async_trace_limit = -1; // unlimited
}
exports.home = util_1.joinPaths(__dirname, "..", "..");
/** Settings that may be determined dynamically. */
class Options {
    constructor(
        /** e.g. '../DefinitelyTyped'
         * This is overridden to `cwd` when running the tester, as that is run from within DefinitelyTyped.
         */
        definitelyTypedPath, 
        /** Whether to show progress bars. Good when running locally, bad when running on travis / azure. */
        progress) {
        this.definitelyTypedPath = definitelyTypedPath;
        this.progress = progress;
        this.typesPath = util_1.joinPaths(definitelyTypedPath, settings_1.typesDirectoryName);
    }
}
/** Options for running locally. */
Options.defaults = new Options("../DefinitelyTyped", true);
Options.azure = new Options("../DefinitelyTyped", false);
exports.Options = Options;
function readDataFile(generatedBy, fileName) {
    return readFileAndWarn(generatedBy, dataFilePath(fileName));
}
exports.readDataFile = readDataFile;
/** If a file doesn't exist, warn and tell the step it should have bene generated by. */
function readFileAndWarn(generatedBy, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield io_1.readJson(filePath);
        }
        catch (e) {
            console.error(`Run ${generatedBy} first!`);
            throw e;
        }
    });
}
exports.readFileAndWarn = readFileAndWarn;
function writeDataFile(filename, content, formatted = true) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fsp.ensureDir(dataDir);
        yield io_1.writeJson(dataFilePath(filename), content, formatted);
    });
}
exports.writeDataFile = writeDataFile;
const dataDir = util_1.joinPaths(exports.home, "data");
function dataFilePath(filename) {
    return util_1.joinPaths(dataDir, filename);
}
//# sourceMappingURL=common.js.map