const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        document
            .getElementById("success_fire")
            ?.addEventListener("click", () => {
                Toast.fire({
                    icon: "success",
                    title: "This is a successful alert!"
                });
            });

        document
            .getElementById("info_fire")
            ?.addEventListener("click", () => {
                Toast.fire({
                    icon: "info",
                    title: "This is an info alert!"
                });
            });

        document
            .getElementById("error_fire")
            ?.addEventListener("click", () => {
                Toast.fire({
                    icon: "error",
                    title: "This is an error alert!"
                });
            });

        document
            .getElementById("warning_fire")
            ?.addEventListener("click", () => {
                Toast.fire({
                    icon: "warning",
                    title: "This is a warning alert!"
                });
            });