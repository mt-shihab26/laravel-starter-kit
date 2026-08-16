<?php

namespace App\Http\Requests\Teams;

use App\Rules\ValidTeamInvitation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RespondToTeamInvitationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invitation' => ['required', new ValidTeamInvitation($this->user())],
        ];
    }

    /**
     * Get the validation data from the request.
     *
     * @return array<string, mixed>
     */
    public function validationData(): array
    {
        return array_merge(parent::validationData(), [
            'invitation' => $this->route('invitation'),
        ]);
    }
}
