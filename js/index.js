var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        window.onclick = function (event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
    }
}
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
function initializeModals() {
    var portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var _a;
            event.preventDefault();
            var targetId = (_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
            if (targetId) {
                openModal(targetId);
            }
        });
    });
}
function fetchImages() {
    return __awaiter(this, void 0, void 0, function () {
        var response, images, fetchedImagesRow, rowDiv_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/photos?_limit=3')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    images = _a.sent();
                    fetchedImagesRow = document.getElementById('fetchedImagesRow');
                    if (fetchedImagesRow) {
                        rowDiv_1 = document.createElement('div');
                        rowDiv_1.className = 'row d-flex justify-content-center';
                        images.forEach(function (image) {
                            var colDiv = document.createElement('div');
                            colDiv.className = 'col-md-4 col-xs-4';
                            colDiv.innerHTML = "\n                    <a href=\"#imageModal".concat(image.id + 6, "\" class=\"portfolio-link\" data-id=\"").concat(image.id, "\" data-toggle=\"modal\">\n                        <img src=\"").concat(image.url, "\" class=\"img-responsive\" style=\"max-width: 300px; height: auto;\" alt=\"").concat(image.title, "\">\n                    </a>\n                ");
                            rowDiv_1.appendChild(colDiv);
                            var link = colDiv.querySelector('.portfolio-link');
                            link.addEventListener('click', function (event) {
                                var _a;
                                event.preventDefault();
                                var modalId = (_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
                                if (modalId) {
                                    openModal(modalId);
                                    var modalImage = document.getElementById("modalImage".concat(image.id));
                                    if (modalImage) {
                                        modalImage.src = image.url;
                                    }
                                }
                            });
                        });
                        fetchedImagesRow.appendChild(rowDiv_1);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching images:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    initializeModals();
    fetchImages();
});
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var _a;
        var modalId = (_a = button.closest('.modal')) === null || _a === void 0 ? void 0 : _a.id;
        if (modalId) {
            closeModal(modalId);
        }
    });
});
(_a = document.getElementById('downloadButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    window.location.href = 'https://initiate.alphacoders.com/download/images5/1334448/png';
});
var currentIndex = 0;
var carousel = document.querySelector('.carousel');
var totalItems = document.querySelectorAll('.carousel-item').length;
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
function updateCarousel() {
    var offset = -currentIndex * 100;
    carousel.style.transform = "translateX(".concat(offset, "%)");
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;
}
prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});
nextBtn.addEventListener('click', function () {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    }
});
updateCarousel();
